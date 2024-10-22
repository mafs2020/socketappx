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
        const res = await uploadToCloudinary(file);
        console.log('res', res)
        urls.push(res.url);
    }
    console.log('urls', urls)
    return res.status(200).json(urls)
   }catch (error){
    return res.status(500).json({ message: 'Error al subir archivos', error });
   }
});

const create = catchError(async (req, res) => {
    //Datos a guardar
    const { users, companys, address, sector } = req.body;
    // console.log('datos', users, companys, address, sector);
    const transaction = await sequelize.transaction();
    try{
        //Guardar las imagenes
        const files = req.files;
        console.log('files', files)
        const urls = [];
        for (const file of files) {
            const { secure_url } = await uploadToCloudinary(file);//secure_url
            urls.push(secure_url);
        }
        console.log('urls', urls)

        
    
        // Crear Address
        const addr = await Address.create(JSON.parse(address), { transaction });
        console.log('address')

        // Crear Company y asociarla con Address
        const comp = await Company.create({
            ...JSON.parse(companys),
            addressId: addr.id,
            urlImg: urls[1]
        }, { transaction });
        console.log('company')

        // Crear Document asociado con Company
        const doc = await Document.create({
            // ...document,
            taxStatus: urls[2],
            address: urls[3],
            bankDetails: urls[4],
            policies: urls[5],
            constitutiveAct: urls[6],
            legalPower: urls[7],
            companyId: comp.id
        }, { transaction });
        console.log('documents')

        // Crear Sector asociado con Company
        const sec = await Sector.create({
            ...JSON.parse(sector),
            companyId: comp.id
        }, { transaction });
        console.log('sector')

        // Crear User asociado con Company
        const uss = await User.create({
            ...JSON.parse(users),
            companyId: comp.id,
            urlImg: urls[0]
        }, { transaction });
        console.log('user')

        // Confirmar la transacción si todo es exitoso
        await transaction.commit();
        return res.status(200).json({
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