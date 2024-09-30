const catchError = require('../../utils/catchError');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../../models/User/User');
const Address = require('../../models/Address/Address');
const Rol = require('../../models/User/Rol');
const AddressType = require('../../models/Address/AddressType');

const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await User.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: Rol }, 
            { model: Address,
                include: AddressType
            }
        ],
    });
    const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
    };
    return res.json(response);
});

const create = catchError(async(req, res) => {
    const { name, email, password } = req.body;
    const lowerCaseName = name.toLowerCase();
    const lowerCaseEmail = email.toLowerCase();
    const encriptedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
        name: lowerCaseName,
        email: lowerCaseEmail,
        password: encriptedPassword,
    });
    await sendEmail({
        to: lowerCaseEmail,
        subject: "Cuenta de para el sistema de subastas creada con éxito 🥳",
        html: `
        <div
        style="
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            background-color: rgb(245 245, 245);
            border-radius: 40px;
            min-height: calc(100vh - 100px);
        "
        ;
        >
        <header>
            <img
            src="http://cdn.mcauto-images-production.sendgrid.net/ca3921367677ec93/67e398cb-00f7-49c6-b97f-713e4f6cfe0b/160x64.png"
            />
        </header>
        <body>
            <h1>Cuenta creada exitosamente</h1>
            <p>
    Hola <b>${lowerCaseName}</b>, tu cuenta fue creada de manera exitosa, espera a que quede habilitada para poder tiener acceso completo a los endpoints de B2B.
            </p>
        </body>
        </div>
        `,
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const lowerCaseEmail = id.toLowerCase();
    const preData = await User.findOne({
        where: {
        email: lowerCaseEmail,
        },
    });
    const { isAdmin } = req.body;
    const result = await User.update({ ...preData.dataValues, isAdmin },
        {
            where: { email: lowerCaseEmail },
            returning: true,
        }
    );
    await sendEmail({
        to: lowerCaseEmail,
        subject: "Cuenta activada 🥳",
        html: `
        <div
        style="
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            background-color: rgb(245 245, 245);
            border-radius: 40px;
            min-height: calc(100vh - 100px);
        "
        ;
        >
        <header>
            <img
            src="http://cdn.mcauto-images-production.sendgrid.net/ca3921367677ec93/67e398cb-00f7-49c6-b97f-713e4f6cfe0b/160x64.png"
            />
        </header>
        <body>
            <h1>Cuenta activada exitosamente.</h1>
            <p>
            Hola <b>${preData.dataValues.name}</b>, la espera valió la pena, tu cuenta con privilegios de administrador fue habilitada exitosamente, ahora tienes acceso completo a los endpoints de B2B.
            </p>
            </body>
        </div>
        `,
    });
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    const user = await User.findOne({ where: { email:lowerCaseEmail } });
    // console.log("lo que devuelve",user)
    if (!user) return res.status(401).json({ message: "Credenciales invalidas" });
    else {
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
        return res.status(401).json({ message: "Credenciales invalidas" });
        else {
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        });
        return res.json({ user, token });
        }
    }
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}