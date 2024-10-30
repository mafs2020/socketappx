const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require("../../controllers/Auction/auctionGuest.controller");
const express = require("express");

const auctionGuestRouter = express.Router();

auctionGuestRouter.route("/userauction").get(getAll).post(create);

auctionGuestRouter
  .route("/userauction/:id")
  .get(getOne)
  .delete(remove)
  .put(update);

module.exports = auctionGuestRouter;
