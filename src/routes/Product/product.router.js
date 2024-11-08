const { getAll, create, getOne, remove, update, getAllProducts 
} = require('../../controllers/Product/product.controller');
const express = require('express');

const ProductRouter = express.Router();

ProductRouter.route('/product')
    .get(getAllProducts)
    .post(create);

ProductRouter.route('/product/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = ProductRouter;