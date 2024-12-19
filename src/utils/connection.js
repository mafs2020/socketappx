const { Sequelize } = require("sequelize");
require("dotenv").config();

const production = {
  dialect: "postgres",
  host: "postgresql://postgres:KveNhoZnKjYlrKNRmdLPxVRzfqKlyHCw@autorack.proxy.rlwy.net:59373/railway",
  database: "railway",
  username: "postgres",
  password: "KveNhoZnKjYlrKNRmdLPxVRzfqKlyHCw",
};

const sequelize = new Sequelize(process.env.DATABASE_URL, production);

module.exports = sequelize;
