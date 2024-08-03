const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");
const MshopMedia = sequelize.define("mshop_media", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  siteid: {
    type: DataTypes.STRING(255),
  },
  type: {
    type: DataTypes.STRING(64),
  },
  fsname: {
    type: DataTypes.STRING(32),
  },
  key: {
    type: DataTypes.STRING(255),
  },
  langid: {
    type: DataTypes.STRING(5),
  },
  domain: {
    type: DataTypes.STRING(32),
  },
  label: {
    type: DataTypes.STRING(255),
  },
  link: {
    type: DataTypes.STRING(255),
  },
  preview: {
    type: DataTypes.TEXT,
  },
  mimetype: {
    type: DataTypes.STRING(64),
  },
  status: {
    type: DataTypes.SMALLINT,
  },
  mtime: {
    type: DataTypes.DATE,
  },
  ctime: {
    type: DataTypes.DATE,
  },
  editor: {
    type: DataTypes.STRING(255),
  },
});