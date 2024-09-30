const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");
const Auction = require("./Auction");
const GuestBid = require("./GuestBid");
const User = require("../User/User");

const AuctionGuest = sequelize.define("auctionGuest",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: "Identificador de los invitados a la subasta",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "tipo de los invitados a la subasta",
    },
    //auction
    //user
    //company
  },
  {
    tableName: "auctionGuest",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

//
Auction.hasMany(AuctionGuest, { foreignKey: 'idAuction' });
Auction.belongsTo(AuctionGuest, { foreignKey: 'idAuction' });

//Usuario
User.hasMany(AuctionGuest, { foreignKey: 'idUser' } )
User.belongsTo(AuctionGuest, { foreignKey: 'idUser' });

//
AuctionGuest.hasMany(GuestBid, { foreignKey: 'idGuest' });
AuctionGuest.belongsTo(GuestBid, { foreignKey: 'idGuest' });

module.exports = AuctionGuest;
