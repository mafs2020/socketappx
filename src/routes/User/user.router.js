const { getAll, create, getOne, remove, update, login, changeNewPassword,
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

UserRouter.route('/user/login').post(login)
UserRouter.route("/user/changePassword/:id").post(changeNewPassword);

module.exports = UserRouter;