const { Router }           = require('express');
const categoriesController = require('../controllers/categories');

const CategoriesRouter = Router();

CategoriesRouter.route('/')

    // Récupère les catégories
    .get(categoriesController.getCategories);

module.exports = CategoriesRouter;