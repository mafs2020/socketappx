const { getAll, create, getOne, remove, update, getAllByUserID, createUserId
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

addressRouter.route('/address/userid').post(getAllByUserID)
addressRouter.route('/address/create/userid').post(createUserId)

module.exports = addressRouter;