const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");
const Metafield = require('./MetaField')
const Price = require('./Price')
const Stock = require('./Stock')
const Variant = require('./VariantProduct')

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

//Metafield
Product.hasMany(Metafield, { foreignKey: 'ProductId' });
Product.belongsTo(Metafield, { foreignKey: 'ProductId' });

//Price
Product.hasMany(Price, { foreignKey: 'ProductId' });
Product.belongsTo(Price, { foreignKey: 'ProductId' });

//Stock
Product.hasMany(Stock, { foreignKey: 'ProductId' });
Product.belongsTo(Stock, { foreignKey: 'ProductId' });

//Variant
Product.hasMany(Variant, { foreignKey: 'ProductId' });
Product.belongsTo(Variant, { foreignKey: 'ProductId' });

module.exports = Product;
