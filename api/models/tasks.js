const Sequelize = require('sequelize');
const sequelize = require('../assets/utils/database');

module.exports = sequelize.define('task', {
    task: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isCompleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});