const errorHandling = require('../utils/errorHandling')
const { serverError } = require('../config/errors')
const helperQueryNumber = require('../utils/helperQueryNumber')

const DEFAULT_OPTIONS = {
  order: [['createdAt', 'DESC']]
}

/**
 * @description Permet de faire un système de pagination sur un model Sequelize
 * @param {Object} Object { req, res, next }
 * @param {*} Model Model Sequelize
 * @param {Object} options Options avec clause where etc.
 */
async function getPagesHelper ({ req, res, next }, Model, options = DEFAULT_OPTIONS) {
  const page = helperQueryNumber(req.query.page, 1)
  const limit = helperQueryNumber(req.query.limit, 10)
  const offset = (page - 1) * limit
  try {
    const result = await Model.findAndCountAll({
      limit,
      offset,
      ...options
    })
    const { count, rows } = result
    const hasMore = (page * limit) < count
    return res.status(200).json({ totalItems: count, hasMore, rows })
  } catch (error) {
    console.log(error)
    return errorHandling(next, serverError)
  }
}

module.exports = getPagesHelper
