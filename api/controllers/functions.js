const errorHandling = require('../assets/utils/errorHandling')
const { serverError } = require('../assets/config/errors')
const Functions = require('../models/functions')
const Categories = require('../models/categories')
const functionToExecute = require('../assets/functions/functionObject')
const helperQueryNumber = require('../assets/utils/helperQueryNumber')
const getPagesHelper = require('../assets/utils/getPagesHelper')
const Sequelize = require('sequelize')

exports.getFunctions = async (req, res, next) => {
  const categoryId = helperQueryNumber(req.query.categoryId, 0)
  let { search } = req.query
  try {
    search = search.toLowerCase()
  } catch {}
  const options = {
    where: {
      isOnline: 1,
      // Trie par catégorie
      ...(categoryId !== 0 && { categorieId: categoryId }),
      // Recherche
      ...(search != null && {
        [Sequelize.Op.or]: [
          {
            title: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('title')),
              'LIKE',
              `%${search}%`
            )
          },
          {
            slug: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('slug')),
              'LIKE',
              `%${search}%`
            )
          },
          {
            description: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('description')),
              'LIKE',
              `%${search}%`
            )
          }
        ]
      })
    },
    include: [{ model: Categories, attributes: ['name', 'color'] }],
    attributes: {
      exclude: ['updatedAt', 'utilizationForm', 'article', 'isOnline']
    },
    order: [['createdAt', 'DESC']]
  }
  return await getPagesHelper({ req, res, next }, Functions, options)
}

exports.getFunctionBySlug = (req, res, next) => {
  const { slug } = req.params
  Functions.findOne({
    where: { slug, isOnline: 1 },
    attributes: {
      exclude: ['updatedAt', 'isOnline']
    },
    include: [{ model: Categories, attributes: ['name', 'color'] }]
  })
    .then(result => {
      if (!result) {
        return errorHandling(next, {
          message: "La fonction n'existe pas.",
          statusCode: 404
        })
      }
      try {
        result.utilizationForm = JSON.parse(result.utilizationForm)
      } catch {}
      return res.status(200).json(result)
    })
    .catch(error => {
      console.log(error)
      return errorHandling(next, serverError)
    })
}

exports.executeFunctionBySlug = (req, res, next) => {
  const functionOutput = functionToExecute(req.params.slug)
  if (functionOutput !== undefined) {
    return functionOutput({ res, next }, req.body)
  }
  return errorHandling(next, {
    message: "La fonction n'existe pas.",
    statusCode: 404
  })
}
