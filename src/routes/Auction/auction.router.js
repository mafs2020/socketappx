const { getAll, create, getOne, remove, update, getAllWinner, getAuctionAddress, createAuctionVariantFile
} = require('../../controllers/Auction/auction.controller');
const express = require('express');
const upload = require("../../utils/multer");

const auctionRouter = express.Router();

auctionRouter.route('/auction')
    .get(getAll)
    .post(create);

auctionRouter.route('/auction/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

auctionRouter.route('/auction/allWinner').get(getAllWinner)

auctionRouter.route('/auction/address/:id').get(getAuctionAddress)
auctionRouter.route('/auction/createFile').post(upload.array("files", 1), createAuctionVariantFile)

module.exports = auctionRouter;