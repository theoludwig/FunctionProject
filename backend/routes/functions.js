const { Router } = require('express');
const { executeFunctionName } = require('../controllers/functions');

const FunctionsRouter = Router();

FunctionsRouter.route('/:functionName')

    // Exécute la fonction demandée en paramètre
    .post(executeFunctionName);

module.exports = FunctionsRouter;