const { Router }      = require('express');
const { body }        = require('express-validator');
const usersController = require('../controllers/users');
const Users           = require('../models/users');

const UsersRouter = Router();

// Permet de se connecter
UsersRouter.post('/login', usersController.login);

// Permet de s'inscrire
UsersRouter.post('/register', [
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
            return true;
        }))
        .normalizeEmail(),
    body('password')
        .isLength({ min: 4 })
        .withMessage("Votre mot de passe est trop court!"),
    body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Vous devez avoir un nom (ou pseudo).")
        .isAlphanumeric()
        .withMessage("Votre nom ne peut contenir que des lettres ou/et des nombres.")
        .isLength({ max: 30 })
        .withMessage("Votre nom est trop long")
        .custom(async (name) => {
            try {
                const user = await Users.findOne({ where: { name } });
                if (user) {
                    return Promise.reject("Le nom existe déjà...");
                }
            } catch (error) {
                console.log(error);
            }
            return true;
        })
], usersController.register);

// Confirme l'inscription
UsersRouter.get('/confirm-email/:tempToken', usersController.confirmEmail);

module.exports = UsersRouter;