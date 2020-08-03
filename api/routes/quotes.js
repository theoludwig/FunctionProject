const { Router } = require('express')
const quotesController = require('../controllers/quotes')
const isAuth = require('../middlewares/isAuth')

const QuotesRouter = Router()

QuotesRouter.route('/')

  // Récupère les citations
  .get(quotesController.getQuotes)

  // Proposer une citation
  .post(isAuth, quotesController.postQuote)

module.exports = QuotesRouter
