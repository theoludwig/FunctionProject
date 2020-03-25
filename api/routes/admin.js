const { Router }      = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const AdminRouter = Router();

// Permet de créé une fonction
AdminRouter.post('/functions', isAuth, isAdmin, adminController.postFunction);

module.exports = AdminRouter;