const Sequelize = require('sequelize');
const sequelize = require('../assets/utils/database');

module.exports = sequelize.define('categorie', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});