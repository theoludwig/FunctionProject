const Sequelize = require('sequelize');
const sequelize = require('../assets/utils/database');

module.exports = sequelize.define('function', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    slug: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isOnline: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});