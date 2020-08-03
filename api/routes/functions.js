const { Router } = require('express')
const functionsController = require('../controllers/functions')

const FunctionsRouter = Router()

FunctionsRouter.route('/')

  // Récupère les fonctions
  .get(functionsController.getFunctions)

FunctionsRouter.route('/:slug')

  // Récupère les informations de la fonction par son slug
  .get(functionsController.getFunctionBySlug)

  // Exécute la fonction demandée en paramètre
  .post(functionsController.executeFunctionBySlug)

module.exports = FunctionsRouter
