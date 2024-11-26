const catchError = require("../../utils/catchError");
const AuctionGuest = require("../../models/Auction/AuctionGuest");

const getAll = catchError(async (req, res) => {
  //Recibe el id de la subasta
  let auctionId = req.body.auctionId;
  const results = await AuctionGuest.findAll({ where: auctionId });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  //En el body debe de llevar la id de la subasta
  const result = await AuctionGuest.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  //Recibe el id de la subasta
  let auctionId = req.body.auctionId;
  const { id } = req.params;
  const result = await AuctionGuest.findOne({ where: id, auctionId });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await AuctionGuest.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await AuctionGuest.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});
const addGuest = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await AuctionGuest.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  addGuest,
};
