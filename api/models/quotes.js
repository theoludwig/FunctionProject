const Sequelize = require('sequelize');
const sequelize = require('../assets/utils/database');

module.exports = sequelize.define('quote', {
    quote: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isValidated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});