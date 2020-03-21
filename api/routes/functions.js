const { Router }          = require('express');
const functionsController = require('../controllers/functions');

const FunctionsRouter = Router();

FunctionsRouter.route('/')

    // Récupère les fonctions
    .get(functionsController.getFunctions);

FunctionsRouter.route('/:functionName')

    // Exécute la fonction demandée en paramètre
    .post(functionsController.executeFunctionName);

module.exports = FunctionsRouter;