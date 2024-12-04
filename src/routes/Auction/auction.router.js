const { getAll, create, getOne, remove, update, getAllWinner, getAuctionAddress, createAuctionVariantFile, getAllSearch,
    getAllCreated, getAllCreatedSearch, updateAuctionAddress,
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

auctionRouter.route('/auction/allWinner').get(getAllWinner);

auctionRouter.route('/auction/address/:id').get(getAuctionAddress);
auctionRouter.route('/auction/createFile').post(upload.array("files", 1), createAuctionVariantFile);
auctionRouter.route('/auction/search').post(getAllSearch);
auctionRouter.route('/auction/created').post(getAllCreated);
auctionRouter.route('/auction/created/search').post(getAllCreatedSearch);
auctionRouter.route('/auction/update/auctionAddress').post(updateAuctionAddress);

module.exports = auctionRouter;