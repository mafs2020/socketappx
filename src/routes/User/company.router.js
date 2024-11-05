const { 
    getAll, create, getOne, remove, update, create2, getAllRegister, getOneWithAddress, updateStatus,
} = require('../../controllers/User/company.controller');
const express = require('express');
const upload = require("../../utils/multer");

const CompanyRouter = express.Router();

CompanyRouter.route('/company')
    .get(getAll)
    .post(upload.array("files", 8),create);

CompanyRouter.route('/company/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

CompanyRouter.route('/companyGetAll').get(getAllRegister);
CompanyRouter.route('/companyAddress/:id').get(getOneWithAddress)

CompanyRouter.route('/companyUpdateStatus').post(updateStatus)

CompanyRouter.route('/imagens').post(upload.array("files", 9),create2);

module.exports = CompanyRouter;