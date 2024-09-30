const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");
const Auction = require("./auction");

const AuctionDetails = sequelize.define("auctionDetails",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: "Identificador del detalle de subasta",
    },
    origen: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Lugar de origen de la subasta",
    },
    //auction
    //product
    //address
  },
  {
    tableName: "auctionDetails",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

//Subasta
Auction.hasOne(AuctionDetails, { foreignKey: 'idAuction' });
Auction.belongsTo(AuctionDetails, { foreignKey: 'idAuction' });

//Producto

//Dirección

module.exports = AuctionDetails;
