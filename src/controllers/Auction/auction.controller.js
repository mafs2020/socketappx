const catchError = require('../../utils/catchError');
const Auction = require('../../models/Auction/Auction');
const AuctionDetails = require('../../models/Auction/AuctionDetails');
const AuctionGuest = require('../../models/Auction/AuctionGuest');
const GuestBid = require('../../models/Auction/GuestBid');

const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await Auction.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: AuctionDetails },
            { model: AuctionGuest },
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


const getAllWinner = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await Auction.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: AuctionDetails },
            { model: AuctionGuest },
            { model: GuestBid, where: {winnerBid: true} },
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

const create = catchError(async(req, res) => {
    let body = req.body;
    const result = await Auction.create({...body, AuctionDetails: undefined});
    let idAu = JSON.stringify(result.id);
    let id_au = idAu.replace("\"", "").replace("\"", "");
    const detAu = {
        idAuction: id_au,
        idProduct: req.body.idProduct,
        idAddress: req.body.idAddress
    };
    await AuctionDetails.create(detAu);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Auction.findByPk({id, 
        include: [
        { model: AuctionDetails },
        { model: AuctionGuest },
    ]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Auction.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Auction.update(
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
    getAllWinner,
}