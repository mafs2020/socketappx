const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    sku: {
      type: DataTypes.STRING,
      comment: "16 caracteres",
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    imageURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    //MetaField ---> unitOfMeasurement
    //PricesId
    //Stock
    //VariantId
  },
  {
    tableName: "product",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Product;
