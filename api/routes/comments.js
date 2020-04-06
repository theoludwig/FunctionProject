const { Router }         = require('express');
const commentsController = require('../controllers/comments');

const CommentsRouter = Router();

// CommentsRouter.route('/')

//     // Récupère les catégories
//     .get(commentsController.getCategories);

module.exports = CommentsRouter;