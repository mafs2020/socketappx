const catchError = require('../../utils/catchError');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../../models/User/User');
const Address = require('../../models/Address/Address');
const Rol = require('../../models/User/Rol');
const AddressType = require('../../models/Address/AddressType');
const sequelize = require("../../utils/connection");

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
    const { 
        language,
        referenceCurrency,
        urlImg,
        dateOfBirth ,
        position, 
        email, 
        password,
        firstName,
        lastName,
        phone,
        timeZone, 
        userName } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    const encriptedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
        email: lowerCaseEmail,
        password: encriptedPassword,
        firstName,
        lastName,
        phone,
        timeZone,
        status: "Active",
        isAdmin: true,
        language,
        referenceCurrency,
        urlImg,
        dateOfBirth,
        position,
        userName });
    // await sendEmail({
    //     to: lowerCaseEmail,
    //     subject: "Cuenta de para el sistema de subastas creada con éxito 🥳",
    //     html: `
    //     <div
    //     style="
    //         max-width: 600px;
    //         margin: 0 auto;
    //         padding: 40px;
    //         background-color: rgb(245 245, 245);
    //         border-radius: 40px;
    //         min-height: calc(100vh - 100px);
    //     "
    //     ;
    //     >
    //     <header>
    //         <img
    //         src="http://cdn.mcauto-images-production.sendgrid.net/ca3921367677ec93/67e398cb-00f7-49c6-b97f-713e4f6cfe0b/160x64.png"
    //         />
    //     </header>
    //     <body>
    //         <h1>Cuenta creada exitosamente</h1>
    //         <p>
    // Hola <b>${lowerCaseName}</b>, tu cuenta fue creada de manera exitosa, espera a que quede habilitada para poder tiener acceso completo a los endpoints de B2B.
    //         </p>
    //     </body>
    //     </div>
    //     `,
    // });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findAll({
        where: {id},
        include :[{ model: Address}]
    });
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
    // await sendEmail({
    //     to: lowerCaseEmail,
    //     subject: "Cuenta activada 🥳",
    //     html: `
    //     <div
    //     style="
    //         max-width: 600px;
    //         margin: 0 auto;
    //         padding: 40px;
    //         background-color: rgb(245 245, 245);
    //         border-radius: 40px;
    //         min-height: calc(100vh - 100px);
    //     "
    //     ;
    //     >
    //     <header>
    //         <img
    //         src="http://cdn.mcauto-images-production.sendgrid.net/ca3921367677ec93/67e398cb-00f7-49c6-b97f-713e4f6cfe0b/160x64.png"
    //         />
    //     </header>
    //     <body>
    //         <h1>Cuenta activada exitosamente.</h1>
    //         <p>
    //         Hola <b>${preData.dataValues.name}</b>, la espera valió la pena, tu cuenta con privilegios de administrador fue habilitada exitosamente, ahora tienes acceso completo a los endpoints de B2B.
    //         </p>
    //         </body>
    //     </div>
    //     `,
    // });
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const { email, password, userName } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    let user = ''
    if(userName == ''){
         user = await User.findOne({ where: { email:lowerCaseEmail } });
    } else {
        user = await User.findOne({ where: { userName } });
    }
    // const user = await User.findOne({ where: { email:lowerCaseEmail } });
    if (!user) return res.status(401).json({ message: "Credenciales invalidas" });
    else {
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
        return res.status(401).json({ message: "Credenciales invalidas" });
        else {
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        });
        const us = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            userName: user.userName,
            position: user.position,
            urlImg: user.urlImg,
            companyId: user.companyId,
            isAdmin: user.isAdmin
        }
        return res.json({ user: us, token });
        }
    }
})

const changeNewPassword = catchError(async (req, res) => {
    const { id } = req.params;
    const { password, newpassword } = req.body;
    //const encriptedPassword = await bcrypt.hash(password, 10);
    const idUs = await User.findOne({ where: { id } });
    const resp = await bcrypt.compare(password, idUs.dataValues.password)
    // const resetCode = await User.findOne({ where: { password: encriptedPassword } });
    if (!resp) return res.status(401).json({ message: "Contraseña invalida" });
    const encriptedPasswordNew = await bcrypt.hash(newpassword, 10);
    const user = await User.update(
      { password: encriptedPasswordNew },
      {
        where: { id },
        returning: true,
      }
    );
    return res.json(user[1][0]);
  });

  const createUserAddress = catchError(async(req, res) => {
    const { user, address, companyId } = req.body;
    // console.log('user', user)
    // console.log('address', address)
    // console.log('companyId', companyId)
    const transaction = await sequelize.transaction();

    const encriptedPassword = await bcrypt.hash(user.password, 10);
    const resultUser = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
        phone: user.phone,
        timeZone: user.timeZone,
        language: user.language,
        referenceCurrency: user.referenceCurrency,
        dateOfBirth: user.dateOfBirth,
        position: user.position,
        password: encriptedPassword,
        isAdmin: user.isAdmin,
        companyId}, 
        { transaction });
    if(!resultUser) {
        await transaction.rollback();
        return res.status(401).json({ message: "Error al crear el usuario", error: resultUser });
    }

    const resultAddress = await Address.create({...address, userId: resultUser.id}, { transaction });
    if(!resultAddress) {
        await transaction.rollback();
        return res.status(401).json({ message: "Error al crear el domicilio", error: resultAddress });
    }

    await transaction.commit();
    return res.status(200).json({
        user: resultUser,
        address: resultAddress
    });
});

const getAllUsersCompany = catchError(async(req, res) => {
    const { companyId } = req.body;
    console.log('companyId', companyId)
    const result = await User.findAll({
        where: {
            companyId: companyId
        }
    });
    if(!result) return res.sendStatus(401).json({ message: "Error al consultar los usuarios", error: result });
    return res.json(result);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    changeNewPassword,
    createUserAddress,
    getAllUsersCompany,
}