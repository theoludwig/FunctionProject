const { Router }      = require('express');
const { body }        = require('express-validator');
const usersController = require('../controllers/users');
const Users           = require('../models/users');

const UsersRouter = Router();

// Permet de se connecter
UsersRouter.post('/login', usersController.login);

// Permet de s'inscrire
UsersRouter.post('/signup', [
    body('email')
        .isEmail()
        .withMessage("Veuillez rentré une adresse mail valide.")
        .custom((async (email) => {
            try {
                const user = await Users.findOne({ where: { email } });
                if (user) {
                    return Promise.reject("L'adresse email existe déjà...");
                }
            } catch (error) {
                return console.log(error);
            }
        }))
        .normalizeEmail(),
    body('password')
        .isLength({ min: 4 })
        .withMessage("Votre mot de passe est trop court!"),
    body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Votre nom ne peut pas être vide.")
        .isAlphanumeric()
        .withMessage("Votre nom ne peut contenir que des lettres ou/et des nombres.")
        .custom((async (name) => {
            try {
                const user = await Users.findOne({ where: { name } });
                if (user) {
                    return Promise.reject("Le nom existe déjà...");
                }
            } catch (error) {
                return console.log(error);
            }
        }))
], usersController.signup);

// Confirme l'inscription
UsersRouter.get('/confirm-email/:tempToken', usersController.confirmEmail);

module.exports = UsersRouter;