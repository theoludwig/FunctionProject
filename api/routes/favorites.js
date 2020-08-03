const { Router } = require('express')
const favoritesController = require('../controllers/favorites')
const isAuth = require('../middlewares/isAuth')

const FavoritesRouter = Router()

FavoritesRouter.route('/:functionId')

// Récupère si une fonction est en favoris (d'un utilisateur)
  .get(isAuth, favoritesController.getFavoriteByFunctionId)

// Permet à un utilisateur d'ajouter une fonction aux favoris
  .post(isAuth, favoritesController.postFavoriteByFunctionId)

// Supprime une fonction des favoris d'un utilisateur
  .delete(isAuth, favoritesController.deleteFavoriteByFunctionId)

module.exports = FavoritesRouter
