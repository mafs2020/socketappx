const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");
const Address = require('../Address/Address')
const User = require('./User')
const Market = require('../../models/Market/Market')
const Sumary = require('../../models/Order/SummaryTransaction')

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

//Address
Company.hasMany(Address, { foreignKey: 'addressId' });
Company.belongsTo(Address, { foreignKey: 'addressId' });

//User
Company.hasMany(User, { foreignKey: 'userId' });
Company.belongsTo(User, { foreignKey: 'userId' });

//Market
Company.hasMany(Market, { foreignKey: 'marketId' });
Company.belongsTo(Market, { foreignKey: 'marketId' });

//Sumary
Company.hasMany(Sumary, { foreignKey: 'sumaryId' });
Company.belongsTo(Sumary, { foreignKey: 'sumaryId' });

module.exports = Company;
