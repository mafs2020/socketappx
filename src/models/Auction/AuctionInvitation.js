const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");
const Auction = require("./Auction");

const AuctionInvitation = sequelize.define("auctionInvitation",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: "Identificador de la invitación a la subasta",
    },
    sendDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "Fecha de envio de invitación",
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Estatus de la invitacion: Enviada, Aceptada o Denegada",
    },
  },
  {
    tableName: "auctionInvitation",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

//Auction
Auction.hasOne(AuctionInvitation)
AuctionInvitation.belongsTo(Auction, { foreignKey: 'auctionId' });

//Company o User
// Auction.hasOne(AuctionInvitation)
// AuctionInvitation.belongsTo(Auction, { foreignKey: 'auctionId' });

module.exports = AuctionInvitation;
