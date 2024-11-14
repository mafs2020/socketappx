const { 
    getAll, create, getOne, remove, update, 
} = require('../../controllers/Auction/auctionInvitation.controller');
const express = require('express');

const auctionInvitaionRouter = express.Router();

auctionInvitaionRouter.route('/auctionInvitation')
    .get(getAll)
    .post(create);

    auctionInvitaionRouter.route('/auctionInvitation/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = auctionInvitaionRouter;