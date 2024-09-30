const { getAll, create, getOne, remove, update, getAllWinner 
} = require('../../controllers/Auction/auction.controller');
const express = require('express');

const auctionRouter = express.Router();

auctionRouter.route('/auction')
    .get(getAll)
    .post(create);

auctionRouter.route('/auction/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

auctionRouter.route('/auction/allWinner').get(getAllWinner)

module.exports = auctionRouter;