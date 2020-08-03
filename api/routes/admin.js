const { Router } = require('express')
const fileUpload = require('express-fileupload')
const { body } = require('express-validator')
const adminController = require('../controllers/admin')
const Functions = require('../models/functions')
const Categories = require('../models/categories')

const AdminRouter = Router()

AdminRouter.route('/functions')

  // Récupère les fonctions
  .get(adminController.getFunctions)

  // Permet de créé une fonction
  .post(
    fileUpload({
      useTempFiles: true,
      safeFileNames: true,
      preserveExtension: Number,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5mb,
      parseNested: true
    }),
    [
      body('title')
        .not()
        .isEmpty()
        .withMessage('La fonction doit avoir un titre.')
        .isLength({ max: 100 })
        .withMessage('Le titre est trop long.')
        .custom(title => {
          if (title === 'undefined') {
            return Promise.reject(new Error('La fonction doit avoir un titre.'))
          }
          return true
        }),
      body('slug')
        .not()
        .isEmpty()
        .withMessage('La fonction doit avoir un slug.')
        .isLength({ max: 100 })
        .withMessage('Le slug est trop long.')
        .custom(slug => {
          if (slug === 'undefined') {
            return Promise.reject(new Error('La fonction doit avoir un slug.'))
          }
          return true
        })
        .custom(async slug => {
          try {
            const FunctionSlug = await Functions.findOne({ where: { slug } })
            if (FunctionSlug) {
              return Promise.reject(new Error('Le slug existe déjà...'))
            }
          } catch (error) {
            console.log(error)
          }
          return true
        }),
      body('description')
        .not()
        .isEmpty()
        .withMessage('La fonction doit avoir une description.')
        .isLength({ max: 255, min: 1 })
        .withMessage('La description est trop longue.')
        .custom(description => {
          if (description === 'undefined') {
            return Promise.reject(
              new Error('La fonction doit avoir une description.')
            )
          }
          return true
        }),
      body('categorieId')
        .not()
        .isEmpty()
        .withMessage('La fonction doit avoir une catégorie.')
        .custom(async categorieId => {
          try {
            const categorieFound = await Categories.findOne({
              where: { id: parseInt(categorieId) }
            })
            if (!categorieFound) {
              return Promise.reject(new Error("La catégorie n'existe pas!"))
            }
          } catch (error) {
            console.log(error)
          }
          return true
        }),
      body('type').custom(type => {
        if (!(type === 'article' || type === 'form' || type === 'page')) {
          return Promise.reject(
            new Error(
              'Le type de la fonction peut être : article, form ou page.'
            )
          )
        }
        return true
      })
    ],
    adminController.postFunction
  )

AdminRouter.route('/functions/:slug')

  // Récupère les informations d'une fonction
  .get(adminController.getFunctionBySlug)

AdminRouter.route('/functions/:id')

  // Modifie information basique d'une fonction
  .put(
    fileUpload({
      useTempFiles: true,
      safeFileNames: true,
      preserveExtension: Number,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5mb,
      parseNested: true
    }),
    [
      body('title')
        .not()
        .isEmpty()
        .withMessage('La fonction doit avoir un titre.')
        .isLength({ max: 100 })
        .withMessage('Le titre est trop long.')
        .custom(title => {
          if (title === 'undefined') {
            return Promise.reject(new Error('La fonction doit avoir un titre.'))
          }
          return true
        }),
      body('slug')
        .not()
        .isEmpty()
        .withMessage('La fonction doit avoir un slug.')
        .isLength({ max: 100 })
        .withMessage('Le slug est trop long.')
        .custom(slug => {
          if (slug === 'undefined') {
            return Promise.reject(new Error('La fonction doit avoir un slug.'))
          }
          return true
        }),
      body('description')
        .not()
        .isEmpty()
        .withMessage('La fonction doit avoir une description.')
        .isLength({ max: 255, min: 1 })
        .withMessage('La description est trop longue.')
        .custom(description => {
          if (description === 'undefined') {
            return Promise.reject(
              new Error('La fonction doit avoir une description.')
            )
          }
          return true
        }),
      body('categorieId')
        .not()
        .isEmpty()
        .withMessage('La fonction doit avoir une catégorie.')
        .custom(async categorieId => {
          try {
            const categorieFound = await Categories.findOne({
              where: { id: parseInt(categorieId) }
            })
            if (!categorieFound) {
              return Promise.reject(new Error("La catégorie n'existe pas!"))
            }
          } catch (error) {
            console.log(error)
          }
          return true
        }),
      body('type').custom(type => {
        if (!(type === 'article' || type === 'form' || type === 'page')) {
          return Promise.reject(
            new Error(
              'Le type de la fonction peut être : article, form ou page.'
            )
          )
        }
        return true
      })
    ],
    adminController.putFunction
  )

  // Supprime une fonction avec son id
  .delete(adminController.deleteFunction)

AdminRouter.route('/functions/article/:id')
  .put(adminController.putFunctionArticle)

AdminRouter.route('/functions/form/:id')
  .put(adminController.putFunctionForm)

AdminRouter.route('/categories')

  // Crée une catégorie
  .post(adminController.postCategory)

AdminRouter.route('/categories/:id')

  // Modifier une catégorie avec son id
  .put(adminController.putCategory)

  // Supprime une catégorie avec son id
  .delete(adminController.deleteCategory)

AdminRouter.route('/quotes')

  // Récupère les citations pas encore validées
  .get(adminController.getQuotes)

AdminRouter.route('/quotes/:id')

  // Valide ou supprime une citation
  .put(adminController.putQuote)

module.exports = AdminRouter
