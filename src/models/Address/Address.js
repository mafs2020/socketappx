const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Address = sequelize.define(
  "address",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    nameId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lineOne: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lineSecond: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lng: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //userId
    //addressType
  },
  {
    tableName: "address",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Address;