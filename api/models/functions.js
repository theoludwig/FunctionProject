const Sequelize = require('sequelize');
const sequelize = require('../assets/utils/database');

module.exports = sequelize.define('function', {
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
        allowNull: false,
        defaultValue: "/images/functions/default.png"
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
        type: Sequelize.TEXT,
        allowNull: true
    },
    isOnline: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});