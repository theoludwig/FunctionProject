const { Router }      = require('express');
const fileUpload      = require('express-fileupload');
const { body }        = require('express-validator');
const adminController = require('../controllers/admin');
const isAuth          = require('../middlewares/isAuth');
const isAdmin         = require('../middlewares/isAdmin');
const Functions       = require('../models/functions');
const Categories      = require('../models/categories');

const AdminRouter = Router();

// Permet de créé une fonction
AdminRouter.post('/functions', isAuth, isAdmin, 
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
            .withMessage("Le titre est trop long."),
        body('slug')
            .not()
            .isEmpty()
            .withMessage("La fonction doit avoir un slug.")
            .isLength({ max: 100 })
            .withMessage("Le slug est trop long.")
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
            .isLength({ max: 255 })
            .withMessage("La description est trop longue."),
        body('categorieId')
            .not()
            .isEmpty()
            .withMessage("La fonction doit avoir une catégorie.")
            .custom(async (categorieId) => {
                try {
                    const categorieFound = await Categories.findOne({ where: { id: categorieId } });
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
    ], 
    adminController.postFunction
);

// Supprime une fonction avec son id
AdminRouter.delete('/functions/:id', isAuth, isAdmin, adminController.deleteFunction);

module.exports = AdminRouter;