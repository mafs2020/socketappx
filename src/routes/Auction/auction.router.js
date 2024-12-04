const {
  getAll,
  create,
  getOne,
  remove,
  update,
  getAllWinner,
  getAuctionAddress,
  createAuctionVariantFile,
  getAllSearch,
  getAllkkk,
} = require("../../controllers/Auction/auction.controller");
const express = require("express");
const upload = require("../../utils/multer");

const auctionRouter = express.Router();

auctionRouter.route("/auction").get(getAll).post(create);

auctionRouter.route("/auction/:tipo/kkk").get(getAllkkk);

auctionRouter.route("/auction/:id").get(getOne).delete(remove).put(update);

auctionRouter.route("/auction/allWinner").get(getAllWinner);

auctionRouter.route("/auction/address/:id").get(getAuctionAddress);
auctionRouter
  .route("/auction/createFile")
  .post(upload.array("files", 1), createAuctionVariantFile);
auctionRouter.route("/auction/search").post(getAllSearch);

module.exports = auctionRouter;
