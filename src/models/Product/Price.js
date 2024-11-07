const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");

const Price = sequelize.define("price",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    unitMax: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    unitMin: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    basePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    specialPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    percentegeDiscount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "price",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Price;
