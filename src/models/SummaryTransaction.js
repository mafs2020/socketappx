const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const SummaryTransaction = sequelize.define(
  "summaryTransaction",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amountTransaction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    description: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    accurateDescription: {
      type: DataTypes.NUMBER,
      allowNull: false,
      comment: "¿Fue precisa la descripción del producto?",
    },
    fastShipping: {
      type: DataTypes.NUMBER,
      allowNull: false,
      comment: "¿Fue rápido el envío?",
    },
    economyShipping: {
      type: DataTypes.NUMBER,
      allowNull: false,
      comment: "¿Fue económico el envío?",
    },
    levelCommunication: {
      type: DataTypes.NUMBER,
      allowNull: false,
      comment: "¿Cómo fué la comunicación?",
    },
    addresseeCompany: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Destinatario",
    },
    senderCompany: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Remitente",
    },
  },
  {
    tableName: "summary",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = SummaryTransaction;
