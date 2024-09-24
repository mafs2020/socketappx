const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const OrderDetail = sequelize.define(
  "orderDetail",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "Valor unitario"
    },
    unitOfMeasurement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "orderDetail",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = OrderDetail;
