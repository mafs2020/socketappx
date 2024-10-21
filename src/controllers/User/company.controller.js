const catchError = require('../../utils/catchError');
const Company = require('../../models/User/Company');
const User = require('../../models/User/User');
const Address = require('../../models/Address/Address');
const Document = require('../../models/User/Document');
const Sector = require('../../models/User/Sectror');
const sequelize = require("../../utils/connection");
const {
    uploadToCloudinary,
    deleteFromCloudinary,
  } = require("../../utils/cloudinary");

const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await User.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: User }
        ],
    });
    const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
    };
    return res.json(response)
});

const create2 = catchError(async (req, res) => {
    const files = req.files;
    console.log('files', files)
    const urls = [];
    try{
    for (const file of files) {
        const { url } = await uploadToCloudinary(file);
        urls.push(url);
    }
    console.log('urls', urls)
    return res.status(400).json(urls)
   }catch (error){
    return res.status(500).json({ message: 'Error al subir archivos', error });
   }
});

const create = catchError(async (req, res) => {
    //Guardar las imagenes
    // const files = req.files;
    // console.log('files', files)
    // const urls = [];
    // for (const file of files) {
    //     const { url } = await uploadToCloudinary(file);
    //     urls.push(url);
    // }
    // console.log('urls', urls)

    //Datos a guardar
    const { users, companys, address, sector } = req.body;
    console.log('datos', users, companys, address, sector);
    const transaction = await sequelize.transaction();
    try {
        // Crear Address
        const addr = await Address.create(address, { transaction });
        console.log('Domicilio lo hizo');

        // Crear Company y asociarla con Address
        const comp = await Company.create({
            ...companys,
            addressId: addr.id
        }, { transaction });
        console.log('Compañía lo hizo');

        // Crear Document asociado con Company
        const doc = await Document.create({
            ...document,
            companyId: comp.id
        }, { transaction });
        console.log('Documentos lo hizo');

        // Crear Sector asociado con Company
        const sec = await Sector.create({
            ...sector,
            companyId: comp.id
        }, { transaction });
        console.log('Sector lo hizo');

        // Crear User asociado con Company
        const uss = await User.create({
            ...users,
            companyId: comp.id
        }, { transaction });
        console.log('User lo hizo');

        // Confirmar la transacción si todo es exitoso
        await transaction.commit();
        return res.status(201).json({
            address: addr,
            company: comp,
            document: doc,
            sector: sec,
            user: uss
        });
    } catch (error) {
        // Revertir la transacción si hay algún error
        await transaction.rollback();
        console.error('Error al crear los registros:', error);
        return res.status(400).json({ message: "Error al guardar los datos", error });
    }
});


const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Company.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Company.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Company.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    create2
}