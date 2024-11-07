const { getAll, create, getOne, remove, update 
} = require('../../controllers/Product/category.controller');
const express = require('express');

const CategoryRouter = express.Router();

CategoryRouter.route('/category')
    .get(getAll)
    .post(create);

    CategoryRouter.route('/category/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = CategoryRouter;