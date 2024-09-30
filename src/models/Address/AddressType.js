const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");
const Address = require("./Address");

const AddressType = sequelize.define(
  "addressType",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    addressType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "addressType",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

Address.hasOne(AddressType, { foreignKey: 'idAddress' });
Address.belongsTo(AddressType, { foreignKey: 'idAddress' });

module.exports = AddressType;
