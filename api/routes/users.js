const { Router } = require('express')
const { body } = require('express-validator')
const fileUpload = require('express-fileupload')
const usersController = require('../controllers/users')
const { requiredFields } = require('../assets/config/errors')
const Users = require('../models/users')
const isAuth = require('../middlewares/isAuth')

const UsersRouter = Router()

UsersRouter.route('/')

  // Récupère les utilisateurs
  .get(usersController.getUsers)

  // Permet de modifier son profil
  .put(
    isAuth,
    fileUpload({
      useTempFiles: true,
      safeFileNames: true,
      preserveExtension: Number,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5mb,
      parseNested: true
    }),
    [
      body('email')
        .isEmail()
        .withMessage('Veuillez rentré une adresse mail valide.')
        .custom(async email => {
          try {
            const user = await Users.findOne({ where: { email } })
            if (user && user.email !== email) {
              return Promise.reject(new Error("L'adresse email existe déjà..."))
            }
          } catch (error) {
            return console.log(error)
          }
          return true
        })
        .normalizeEmail(),
      body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Vous devez avoir un nom (ou pseudo).')
        .isAlphanumeric()
        .withMessage(
          'Votre nom ne peut contenir que des lettres ou/et des nombres.'
        )
        .isLength({ max: 30 })
        .withMessage('Votre nom est trop long')
        .custom(async name => {
          try {
            const user = await Users.findOne({ where: { name } })
            if (user && user.name !== name) {
              return Promise.reject(new Error('Le nom existe déjà...'))
            }
          } catch (error) {
            console.log(error)
          }
          return true
        }),
      body('isPublicEmail')
        .isBoolean()
        .withMessage(
          "L'adresse email peut être public ou privé, rien d'autre."
        ),
      body('biography')
        .trim()
        .escape()
    ],
    usersController.putUser
  )

// Permet de se connecter
UsersRouter.post(
  '/login',
  [
    body('email')
      .not()
      .isEmpty()
      .withMessage(requiredFields.message),
    body('password')
      .not()
      .isEmpty()
      .withMessage(requiredFields.message)
  ],
  usersController.login
)

// Récupère les informations public d'un profil
UsersRouter.get('/:name', usersController.getUserInfo)

// Permet de s'inscrire
UsersRouter.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Veuillez rentré une adresse mail valide.')
      .custom(async email => {
        try {
          const user = await Users.findOne({ where: { email } })
          if (user) {
            return Promise.reject(new Error("L'adresse email existe déjà..."))
          }
        } catch (error) {
          return console.log(error)
        }
        return true
      }),
    body('password')
      .isLength({ min: 4 })
      .withMessage('Votre mot de passe est trop court!'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Vous devez avoir un nom (ou pseudo).')
      .isAlphanumeric()
      .withMessage(
        'Votre nom ne peut contenir que des lettres ou/et des nombres.'
      )
      .isLength({ max: 30 })
      .withMessage('Votre nom est trop long')
      .custom(async name => {
        try {
          const user = await Users.findOne({ where: { name } })
          if (user) {
            return Promise.reject(new Error('Le nom existe déjà...'))
          }
        } catch (error) {
          console.log(error)
        }
        return true
      })
  ],
  usersController.register
)

// Confirme l'inscription
UsersRouter.get('/confirm-email/:tempToken', usersController.confirmEmail)

UsersRouter.route('/reset-password')

  // Demande une réinitialisation du mot de passe
  .post(
    [
      body('email')
        .isEmail()
        .withMessage('Veuillez rentré une adresse mail valide.')
    ],
    usersController.resetPassword
  )

  // Nouveau mot de passe
  .put(
    [
      body('password')
        .isLength({ min: 4 })
        .withMessage('Votre mot de passe est trop court!')
    ],
    usersController.newPassword
  )

module.exports = UsersRouter
