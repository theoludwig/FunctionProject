const errorHandling = require('../assets/utils/errorHandling')
const { serverError, requiredFields } = require('../assets/config/errors')
const Quotes = require('../models/quotes')
const Users = require('../models/users')
const getPagesHelper = require('../assets/utils/getPagesHelper')

exports.getQuotes = async (req, res, next) => {
  const options = {
    where: {
      isValidated: 1
    },
    include: [{ model: Users, attributes: ['name', 'logo'] }],
    attributes: {
      exclude: ['isValidated']
    },
    order: [['createdAt', 'DESC']]
  }
  return await getPagesHelper({ req, res, next }, Quotes, options)
}

exports.postQuote = (req, res, next) => {
  const { quote, author } = req.body
  // S'il n'y a pas les champs obligatoire
  if (!(quote && author)) {
    return errorHandling(next, requiredFields)
  }
  Quotes.create({ quote, author, userId: req.userId })
    .then(_result => {
      return res
        .status(200)
        .json({
          message:
            "La citation a bien été ajoutée, elle est en attente de confirmation d'un administrateur."
        })
    })
    .catch(error => {
      console.log(error)
      return errorHandling(next, serverError)
    })
}
