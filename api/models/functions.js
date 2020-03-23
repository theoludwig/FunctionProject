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
        type: Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: Sequelize.STRING,
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
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    article: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    utilizationForm: {
        type: Sequelize.JSON,
        allowNull: true
    },
    isOnline: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});