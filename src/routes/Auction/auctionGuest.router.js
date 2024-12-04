const {
  getAll,
  create,
  getOne,
  remove,
  update,
  addGuest,
} = require("../../controllers/Auction/auctionGuest.controller");
const express = require("express");

const auctionGuestRouter = express.Router();

auctionGuestRouter.route("/auctionguest").get(getAll).post(create);
auctionGuestRouter.route("/auctionguest/add").post(addGuest);

auctionGuestRouter
  .route("/auctionguest/:id")
  .get(getOne)
  .delete(remove)
  .put(update);

module.exports = auctionGuestRouter;
