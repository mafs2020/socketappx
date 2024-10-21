const { getAll, create, getOne, remove, update, create2 
} = require('../../controllers/User/company.controller');
const express = require('express');
const upload = require("../../utils/multer");

const CompanyRouter = express.Router();

CompanyRouter.route('/company')
    .get(getAll)
    .post(upload.array("files", 10),create);

CompanyRouter.route('/company/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

CompanyRouter.route('/imagens').post(upload.array("files", 9),create2);

module.exports = CompanyRouter;