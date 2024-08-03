const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/connection');

const Attribute = sequelize.define('attribute', {
    campo1: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
module.exports = Attribute;