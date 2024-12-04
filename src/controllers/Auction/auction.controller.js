const catchError = require("../../utils/catchError");
const Auction = require("../../models/Auction/Auction");
const AuctionGuest = require("../../models/Auction/AuctionGuest");
const GuestBid = require("../../models/Auction/GuestBid");
const Address = require("../../models/Address/Address");
const Company = require("../../models/User/Company");
const VariantProduct = require("../../models/Product/VariantProduct");
const Price = require("../../models/Product/Price");
const Stock = require("../../models/Product/Stock");
const Product = require("../../models/Product/Product");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../../utils/cloudinary");
const sequelize = require("../../utils/connection");
const User = require("../../models/User/User");
const { Op, literal, col } = require("sequelize");
const Category = require("../../models/Product/Category");

const getAll = catchError(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  const results = await Auction.findAndCountAll({
    limit: pageSize,
    offset: offset,
    include: [{ model: AuctionGuest }],
  });
  const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
  };
  return res.json(response);
});

const getAllkkk = catchError(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const { status = "Activo" } = req.body;
  const offset = (page - 1) * pageSize;
  const results = await Auction.findAndCountAll({
    limit: pageSize,
    offset: offset,
    include: [{ model: AuctionGuest }],
    where: [{ status }],
  });
  const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
  };
  return res.json(response);
});

const getAllWinner = catchError(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  const results = await Auction.findAndCountAll({
    limit: pageSize,
    offset: offset,
    include: [
      { model: AuctionGuest },
      { model: GuestBid, where: { winnerBid: true } },
    ],
  });
  const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
  };
  return res.json(response);
});

const create = catchError(async (req, res) => {
  let body = req.body;
  //   return res.status(404).json({ error: "este es un error desde el backend" });
  return res.status(201).json({ ok: "auction Controller" });
  const result = await Auction.create({ ...body });
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Auction.findByPk(id, {
    include: [
      { model: Address },
      { model: VariantProduct },
      { model: AuctionGuest, include: [{ model: User }, { model: GuestBid }] },
    ],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Auction.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Auction.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const getAuctionAddress = catchError(async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const result = await Auction.findAll({
    where: { id },
    include: [
      { model: Address },
      { model: Company },
      {
        model: VariantProduct,
        include: [{ model: Price }, { model: Stock }, { model: Product }],
      },
    ],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const createAuctionVariantFile = catchError(async (req, res) => {
  const {
    auction,
    address,
    variantProduct,
    price,
    stock,
    productId,
    companyId,
  } = req.body;
  const transaction = await sequelize.transaction();
  console.log(
    "datos:",
    JSON.parse(auction),
    JSON.parse(address),
    JSON.parse(variantProduct),
    JSON.parse(price),
    JSON.parse(stock),
    JSON.parse(productId),
    JSON.parse(companyId)
  );
  try {
    const files = req.files;
    // console.log('files', files)
    const urls = [];
    for (const file of files) {
      const { secure_url } = await uploadToCloudinary(file); //secure_url
      urls.push(secure_url);
    }
    console.log("urls", urls);

    const addressss = await Address.create(
      { ...JSON.parse(address), mainAddress: true },
      { transaction }
    );

    const variantProductt = await VariantProduct.create(
      {
        ...JSON.parse(variantProduct),
        imageURL: urls[0],
        isActive: true,
        productId: JSON.parse(productId),
        companyId: JSON.parse(companyId),
      },
      { transaction }
    );

    const stockss = await Stock.create(
      {
        ...JSON.parse(stock),
        variantProductId: variantProductt.id,
        companyId: "",
      },
      { transaction }
    );

    const pricesss = await Price.create(
      {
        ...JSON.parse(price),
        variantProductId: variantProductt.id,
      },
      { transaction }
    );

    const auctionsss = await Auction.create(
      {
        ...JSON.parse(auction),
        variantProductId: variantProductt.id,
        addressId: addressss.id,
        companyId: JSON.parse(companyId),
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(200).json({
      address: addressss,
      variantProduct: variantProductt,
      stopck: stockss,
      price: pricesss,
      auction: auctionsss,
    });
  } catch (error) {
    await transaction.rollback();
    return res
      .status(404)
      .json({ message: "Error al guardar los datos de la apuesta", error });
  }
});

const getAllSearch = catchError(async (req, res) => {
  const { query, companyId } = req.body;
  const result = await Auction.findAll({
    include: [
      {
        model: VariantProduct,
        include: [
          { model: Stock },
          { model: Price },
          { model: Product, include: [{ model: Category }] },
        ],
      },
    ],
    where: {
      companyId: companyId,
      name: { [Op.iLike]: `%${query}%` },
      openAuction: false,
    },
    subQuery: false,
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

module.exports = {
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
};
