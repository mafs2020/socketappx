const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");

const VariantProduct = sequelize.define(
  "variantProduct",
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
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    //metaField
    //PricesId
    //Stock
  },
  {
    tableName: "variantProduct",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = VariantProduct;
