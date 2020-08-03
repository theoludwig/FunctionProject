const { Router } = require('express')
const commentsController = require('../controllers/comments')
const isAuth = require('../middlewares/isAuth')

const CommentsRouter = Router()

CommentsRouter.route('/:commentId')

  // Modifier un commentaire
  .put(isAuth, commentsController.putCommentsById)

  // Supprime un commentaire
  .delete(isAuth, commentsController.deleteCommentById)

CommentsRouter.route('/:functionId')

  // Récupère les commentaires
  .get(commentsController.getCommentsByFunctionId)

  // Permet à un utilisateur de poster un commentaire sur une fonction
  .post(isAuth, commentsController.postCommentsByFunctionId)

module.exports = CommentsRouter
