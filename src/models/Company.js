const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Company = sequelize.define(
  "company",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    legalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Persona física o moral",
    },
    legalId: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "RFC/VAT/Numero de identificacion",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    webSite: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //addressId
    //userId
    //marketId
    //summaryId
  },
  {
    tableName: "company",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Company;
