const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  host: "postgresql://postgres:KveNhoZnKjYlrKNRmdLPxVRzfqKlyHCw@autorack.proxy.rlwy.net:59373/railway",
  database: "railway",
  username: "postgres",
  password: "KveNhoZnKjYlrKNRmdLPxVRzfqKlyHCw",
});

module.exports = sequelize;
