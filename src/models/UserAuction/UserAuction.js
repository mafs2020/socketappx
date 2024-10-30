const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Auction = require("../Auction/Auction");
const User = require("../User/User");

const UserAction = sequelize.define(
  "UserAuction",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AuctionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "UserAuction",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

Auction.belongsToMany(User, { through: "UserAuction" });
User.belongsToMany(Auction, { through: "UserAuction" });

module.exports = UserAction;
