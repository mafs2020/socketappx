const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");
const Address = require("../Address/Address");

const Auction = sequelize.define("auction",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: "Identificador de la subasta",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Nombre de la subasta",
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Descripción de la subasta",
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Fecha de inicio de la subasta",
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Fecha de fin de la subasta",
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Tipo de la subasta",
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Estatus de la subasta (Pendiente, Activo, Concluida)",
    },
    prorogation: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Prorroga de la subasta",
    },
    lastBid: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Puja de última hora",
    },
    startDateReal: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Fecha de inicio de la subasta real",
    },
    endDateReal: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Fecha de fin de la subasta real",
    },
    //auctionGuest
  },
  {
    tableName: "auction",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

//Address
Auction.hasOne(Address, { foreignKey: 'addressId' })
Address.belongsTo(Auction, { foreignKey: 'addressId' });

module.exports = Auction;
