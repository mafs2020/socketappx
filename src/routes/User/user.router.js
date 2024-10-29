const { getAll, create, getOne, remove, update, login, 
    changeNewPassword, createUserAddress, getAllUsersCompany, updateUserAddress, 
    updatePasswordUser, deleteUser, cambiarStatusUser,
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
UserRouter.route("/user/create").post(createUserAddress);
UserRouter.route("/user/getUsers").post(getAllUsersCompany);
UserRouter.route("/user/updateUsAd").post(updateUserAddress);
UserRouter.route("/user/updatePass").post(updatePasswordUser);
UserRouter.route("/user/delete").post(deleteUser);
UserRouter.route("/user/status").post(cambiarStatusUser);

module.exports = UserRouter;