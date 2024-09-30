const catchError = require('../../utils/catchError');
const Address = require('../../models/Address/Address')
const AddressType = require('../../models/Address/AddressType');

const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await Address.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [{ model: AddressType }],
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

const create = catchError(async(req, res) => {
    let body = req.body;
    const result = await Address.create({...body, AddressType: undefined});
    let idAddress = JSON.stringify(result.id);
    let p = idAddress.replace("\"", "").replace("\"", "");
    // console.log('idAddress: ', p)
    for (let i = 0; i < body.AddressType.length; i++) {
        const addType = {
            addressType: body.AddressType[i].addressType,
            addressId: p,
        };
        await AddressType.create(addType);
    }
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Address.findByPk({
        where: id,
        include: [{ model: AddressType }],
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Address.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    let body = req.body;
    let AddType = req.body.AddressType;
    const { id } = req.params;
    const result = await Address.update(
        {...body, AddressType: undefined, 
            where: {id}, returning: true
        }
    );
    const result1 = await AddressType.update(
        {  AddressType: AddType, 
            where: {addressId: id}, returning: true
        }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json({Address: result[1][0], AddressType: result1[1][0]});
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}