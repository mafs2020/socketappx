const { 
    getAll, create, getOne, remove, update, getAllCompany,
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

auctionInvitaionRouter.route('/auctionInvitation/companyId').post(getAllCompany)

module.exports = auctionInvitaionRouter;