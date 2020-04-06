const { Router }           = require('express');
const favoritesController = require('../controllers/categories');

const FavoritesRouter = Router();

// FavoritesRouter.route('/')

//     // Récupère les catégories
//     .get(favoritesController.getCategories);

module.exports = FavoritesRouter;