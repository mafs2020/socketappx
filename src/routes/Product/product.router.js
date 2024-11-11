const { getAll, create, getOne, remove, update, getAllProducts, getAllProductsCompany,
} = require('../../controllers/Product/product.controller');
const express = require('express');
const upload = require("../../utils/multer");

const ProductRouter = express.Router();

ProductRouter.route('/product')
    .get(getAllProducts)
    .post(upload.array("files", 1),create);

ProductRouter.route('/product/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

ProductRouter.route('/product/company').post(getAllProductsCompany)

module.exports = ProductRouter;