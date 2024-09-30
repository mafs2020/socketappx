const { getAll, create, getOne, remove, update 
} = require('../../controllers/Address/address.controller');
const express = require('express');

const addressRouter = express.Router();

addressRouter.route('/address')
    .get(getAll)
    .post(create);

addressRouter.route('/address/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = addressRouter;