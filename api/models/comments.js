const Sequelize = require('sequelize')
const sequelize = require('../assets/utils/database')

module.exports = sequelize.define('comment', {
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})
