const { getAll, create, getOne, remove, update 
} = require('../../controllers/User/company.controller');
const express = require('express');

const CompanyRouter = express.Router();

CompanyRouter.route('/company')
    .get(getAll)
    .post(create);

CompanyRouter.route('/company/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = CompanyRouter;