const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");

const MshopMediaList = sequelize.define("mshop_media_list", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  parentid: {
    type: DataTypes.INTEGER,
  },
  siteid: {
    type: DataTypes.STRING(255),
  },
  type: {
    type: DataTypes.STRING(64),
  },
  domain: {
    type: DataTypes.STRING(32),
  },
  refid: {
    type: DataTypes.STRING(36),
  },
  start: {
    type: DataTypes.DATE,
  },
  end: {
    type: DataTypes.DATE,
  },
  config: {
    type: DataTypes.TEXT,
  },
  pos: {
    type: DataTypes.INTEGER,
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
