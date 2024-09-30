const { getAll, create, getOne, remove, update 
} = require('../../controllers/User/user.controller');
const express = require('express');

const UserRouter = express.Router();

UserRouter.route('/user')
    .get(getAll)
    .post(create);

UserRouter.route('/user/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = UserRouter;