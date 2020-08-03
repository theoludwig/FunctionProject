const Sequelize = require('sequelize')
const sequelize = require('../assets/utils/database')

module.exports = sequelize.define('short_link', {
  url: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  shortcut: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})
