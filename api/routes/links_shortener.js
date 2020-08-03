const { Router } = require('express')
const linksShortenerController = require('../controllers/links_shortener')
const isAuth = require('../middlewares/isAuth')

const LinksShortenerRouter = Router()

LinksShortenerRouter.route('/')

  // Récupère les liens d'un utilisateur
  .get(isAuth, linksShortenerController.getLinks)

  // Ajouter un lien à raccourcir d'un utilisateur
  .post(isAuth, linksShortenerController.postLink)

LinksShortenerRouter.route('/:id')

  // Permet de modifier le lien raccourci d'un utilisateur
  .put(isAuth, linksShortenerController.putLink)

  // Supprimer un lien d'un utilisateur
  .delete(isAuth, linksShortenerController.deleteLink)

module.exports = LinksShortenerRouter
