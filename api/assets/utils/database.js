const Sequelize = require('sequelize')
const { DATABASE } = require('../config/config')

const sequelize = new Sequelize(DATABASE.name, DATABASE.user, DATABASE.password, {
  dialect: 'mysql',
  host: DATABASE.host
})

module.exports = sequelize
