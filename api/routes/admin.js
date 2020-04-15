const { Router }      = require('express');
const fileUpload      = require('express-fileupload');
const { body }        = require('express-validator');
const adminController = require('../controllers/admin');
const isAuth          = require('../middlewares/isAuth');
const isAdmin         = require('../middlewares/isAdmin');
const Functions       = require('../models/functions');
const Categories      = require('../models/categories');

const AdminRouter = Router();

AdminRouter.route('/functions')

    // Récupère les fonctions
    .get(isAuth, isAdmin, adminController.getFunctions)

    // Permet de créé une fonction
    .post(isAuth, isAdmin, 
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
            .withMessage("La fonction doit avoir un titre.")
            .isLength({ max: 100 })
            .withMessage("Le titre est trop long.")
            .custom(((title) => {
                if (title === 'undefined') {
                    return Promise.reject("La fonction doit avoir un titre.");
                }
                return true;
            })),
        body('slug')
            .not()
            .isEmpty()
            .withMessage("La fonction doit avoir un slug.")
            .isLength({ max: 100 })
            .withMessage("Le slug est trop long.")
            .custom(((slug) => {
                if (slug === 'undefined') {
                    return Promise.reject("La fonction doit avoir un slug.");
                }
                return true;
            }))
            .custom((async (slug) => {
                try {
                    const FunctionSlug = await Functions.findOne({ where: { slug } });
                    if (FunctionSlug) {
                        return Promise.reject("Le slug existe déjà...");
                    }
                } catch (error) {
                    console.log(error);
                }
                return true;
            })),
        body('description')
            .not()
            .isEmpty()
            .withMessage("La fonction doit avoir une description.")
            .isLength({ max: 255, min: 1 })
            .withMessage("La description est trop longue.")
            .custom(((description) => {
                if (description === 'undefined') {
                    return Promise.reject("La fonction doit avoir une description.");
                }
                return true;
            })),
        body('categorieId')
            .not()
            .isEmpty()
            .withMessage("La fonction doit avoir une catégorie.")
            .custom(async (categorieId) => {
                try {
                    const categorieFound = await Categories.findOne({ where: { id: parseInt(categorieId) } });
                    if (!categorieFound) {
                        return Promise.reject("La catégorie n'existe pas!");
                    }
                } catch (error) {
                    console.log(error);
                }
                return true;
            }),
        body('type')
            .custom((type) => {
                if (!(type === 'article' || type === 'form' || type === 'page')) {
                    return Promise.reject('Le type de la fonction peut être : article, form ou page.');
                }
                return true;
            })
    ], adminController.postFunction);

AdminRouter.route('/functions/:slug')

    // Récupère les informations d'une fonction
    .get(isAuth, isAdmin, adminController.getFunctionBySlug);

AdminRouter.route('/functions/:id')

    // Modifie information basique d'une fonction
    .put(isAuth, isAdmin, 
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
                .withMessage("La fonction doit avoir un titre.")
                .isLength({ max: 100 })
                .withMessage("Le titre est trop long.")
                .custom(((title) => {
                    if (title === 'undefined') {
                        return Promise.reject("La fonction doit avoir un titre.");
                    }
                    return true;
                })),
            body('slug')
                .not()
                .isEmpty()
                .withMessage("La fonction doit avoir un slug.")
                .isLength({ max: 100 })
                .withMessage("Le slug est trop long.")
                .custom(((slug) => {
                    if (slug === 'undefined') {
                        return Promise.reject("La fonction doit avoir un slug.");
                    }
                    return true;
                })),
            body('description')
                .not()
                .isEmpty()
                .withMessage("La fonction doit avoir une description.")
                .isLength({ max: 255, min: 1 })
                .withMessage("La description est trop longue.")
                .custom(((description) => {
                    if (description === 'undefined') {
                        return Promise.reject("La fonction doit avoir une description.");
                    }
                    return true;
                })),
            body('categorieId')
                .not()
                .isEmpty()
                .withMessage("La fonction doit avoir une catégorie.")
                .custom(async (categorieId) => {
                    try {
                        const categorieFound = await Categories.findOne({ where: { id: parseInt(categorieId) } });
                        if (!categorieFound) {
                            return Promise.reject("La catégorie n'existe pas!");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    return true;
                }),
            body('type')
                .custom((type) => {
                    if (!(type === 'article' || type === 'form' || type === 'page')) {
                        return Promise.reject('Le type de la fonction peut être : article, form ou page.');
                    }
                    return true;
                })
        ], adminController.putFunction)

    // Supprime une fonction avec son id
    .delete(isAuth, isAdmin, adminController.deleteFunction);

AdminRouter.route('/functions/article/:id')

    .put(isAuth, isAdmin, adminController.putFunctionArticle);

AdminRouter.route('/functions/form/:id')

    .put(isAuth, isAdmin, adminController.putFunctionForm);

AdminRouter.route('/categories')

    // Crée une catégorie
    .post(isAuth, isAdmin, adminController.postCategory);

AdminRouter.route('/categories/:id')

    // Modifier une catégorie avec son id
    .put(isAuth, isAdmin, adminController.putCategory)

    // Supprime une catégorie avec son id
    .delete(isAuth, isAdmin, adminController.deleteCategory);

module.exports = AdminRouter;