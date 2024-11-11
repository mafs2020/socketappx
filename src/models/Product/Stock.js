const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");
const VariantProduct = require("./VariantProduct");

const Stock = sequelize.define("stock",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    companyId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // sku: {
    //   type: DataTypes.STRING,
    //   comment: "16 caracteres",
    //   allowNull: false,
    // },
    stock: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "Disponibilidad",
    },
  },
  {
    tableName: "stock",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Stock;
