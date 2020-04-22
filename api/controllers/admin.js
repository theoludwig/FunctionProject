const path                     = require('path');
const fs                       = require('fs');
const { validationResult }     = require('express-validator');
const errorHandling            = require('../assets/utils/errorHandling');
const { serverError }          = require('../assets/config/errors');
const Functions                = require('../models/functions');
const Categories               = require('../models/categories');
const Quotes                   = require('../models/quotes');
const Users                    = require('../models/users');
const helperQueryNumber        = require('../assets/utils/helperQueryNumber');
const Sequelize                = require('sequelize');
const deleteFilesNameStartWith = require('../assets/utils/deleteFilesNameStartWith');

const handleEditFunction = async (res, resultFunction, { title, slug, description, type, categorieId, isOnline }, imageName = false) => {
    resultFunction.title       = title;
    resultFunction.slug        = slug;
    resultFunction.description = description;
    resultFunction.type        = type;
    resultFunction.categorieId = categorieId;
    resultFunction.isOnline    = isOnline;
    if (imageName) {
        resultFunction.image = `/images/functions/${imageName}`;
    }
    const result = await resultFunction.save();
    res.status(200).json({ message: "La fonction a bien été modifié!", result });
}

exports.getFunctions = (req, res, next) => {
    const page       = helperQueryNumber(req.query.page, 1);
    const limit      = helperQueryNumber(req.query.limit, 10);
    const categoryId = helperQueryNumber(req.query.categoryId, 0);
    let   search     = req.query.search;
    try { search = search.toLowerCase(); } catch {}
    const offset     = (page - 1) * limit;
    Functions.findAndCountAll({ 
        limit, 
        offset, 
        where: {
            // Trie par catégorie
            ... (categoryId !== 0) && { categorieId: categoryId },
            // Recherche
            ... (search != undefined) && { 
                [Sequelize.Op.or]: [
                    { title: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE', `%${search}%`) },
                    { slug: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('slug')), 'LIKE', `%${search}%`) },
                    { description: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), 'LIKE', `%${search}%`) }
                ]
            }
        },
        include: [
            { model: Categories, attributes: ["name", "color"] }
        ],
        attributes: {
            exclude: ["updatedAt", "utilizationForm", "article", "isOnline"]
        },
        order: [['createdAt', 'DESC']]
    })
        .then((result) => {
            const { count, rows } = result;
            const hasMore = (page * limit) < count;
            return res.status(200).json({ totalItems: count, hasMore, rows });
        })
        .catch((error) => {
            console.log(error);
            return errorHandling(next, serverError);
        });
}

exports.getFunctionBySlug = (req, res, next) => {
    const { slug } = req.params;
    Functions.findOne({ 
        where: { slug },
        include: [
            { model: Categories, attributes: ["name", "color"] }
        ]
    })
        .then((result) => {
            if (!result) {
                return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
            }
            return res.status(200).json(result);
        })
        .catch((error) => {
            console.log(error);
            return errorHandling(next, serverError);
        });
}

exports.postFunction = (req, res, next) => {
    const { title, slug, description, type, categorieId } = req.body;
    const image = req.files.image;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorHandling(next, { message: errors.array()[0].msg, statusCode: 400 });
    }
    if (!image || image.truncated && (
        image.mimetype !== 'image/png' || 
        image.mimetype !== 'image/jpg' || 
        image.mimetype !== 'image/jpeg'
    )) {
        return errorHandling(next, { message:"La fonction doit avoir une image valide.", statusCode: 400 });
    }
    const splitedImageName = image.name.split('.');
    if (splitedImageName.length !== 2) return errorHandling(next, serverError);
    const imageName = slug + '.' + splitedImageName[1];
    image.mv(path.join(__dirname, '..', 'assets', 'images', 'functions') + '/' + imageName, async (error) => {
        if (error) return errorHandling(next, serverError);
        try {
            const result = await Functions.create({ title, slug, description, type, categorieId, image: `/images/functions/${imageName}` });
            return res.status(201).json({ message: "La fonction a été correctement ajouté!", result });
        } catch (error) {
            console.log(error);
            return errorHandling(next, serverError);
        }
    });
}

exports.putFunction = async (req, res, next) => {
    const { id }                                                    = req.params;
    const { title, slug, description, type, categorieId, isOnline } = req.body;
    const image                                                     = req.files.image;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorHandling(next, { message: errors.array()[0].msg, statusCode: 400 });
    }
    try {
        // Vérifie si la fonction existe
        const resultFunction = await Functions.findOne({ where: { id } });
        if (!resultFunction) {
            return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
        }

        // Vérifie si le slug existe déjà
        const FunctionSlug = await Functions.findOne({ where: { slug } });
        if (!FunctionSlug && FunctionSlug.id != resultFunction.id) {
            return errorHandling(next, { message: "Le slug existe déjà...", statusCode: 404 });
        }

        // Sauvegarde de la fonction
        if (image != undefined) {
            if (image.truncated && (
                image.mimetype !== 'image/png' || 
                image.mimetype !== 'image/jpg' || 
                image.mimetype !== 'image/jpeg'
            )) {
                return errorHandling(next, { message:"La fonction doit avoir une image valide.", statusCode: 400 });
            }
            const splitedImageName = image.name.split('.');
            if (splitedImageName.length !== 2) return errorHandling(next, serverError);
            const imageName = slug + '.' + splitedImageName[1];
            // Supprime les anciennes images
            const functionPath = path.join(__dirname, '..', 'assets', 'images', 'functions');
            deleteFilesNameStartWith(slug, functionPath, () => {
                image.mv(path.join(functionPath, imageName), async (error) => {
                    if (error) return errorHandling(next, serverError);
                    return await handleEditFunction(res, resultFunction, { title, slug, description, type, categorieId, isOnline }, imageName);
                });
            });
        } else {
            return await handleEditFunction(res, resultFunction, { title, slug, description, type, categorieId, isOnline });
        }
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.putFunctionArticle = async (req, res, next) => {
    const { id }      = req.params;
    const { article } = req.body;

    try {
        // Vérifie si la fonction existe
        const resultFunction = await Functions.findOne({ where: { id } });
        if (!resultFunction) {
            return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
        }
        resultFunction.article = article;
        const result = await resultFunction.save();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.putFunctionForm = async (req, res, next) => {
    const { id }   = req.params;
    const { form } = req.body;

    try {
        // Vérifie si la fonction existe
        const resultFunction = await Functions.findOne({ where: { id } });
        if (!resultFunction) {
            return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
        }
        resultFunction.utilizationForm = form;
        const result = await resultFunction.save();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.deleteFunction = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await Functions.findOne({ where: { id } });
        if (!result) {
            return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
        }
        if (result.image !== "/images/functions/default.png") {
            const filePath = path.join(__dirname, '..', 'assets', result.image);
            fs.unlinkSync(filePath); // supprime le fichier
        }
        await result.destroy();
        res.status(200).json({ message: "La fonction a été correctement supprimé!"});
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.postCategory = async (req, res, next) => {
    const { name, color } = req.body;
    if (!(name && color)) {
        return errorHandling(next, { message: "La catégorie doit avoir un nom et une couleur." });
    }
    try {
        const result = await Categories.create({ name, color });
        return res.status(201).json({ message: "La catégorie a bien été crée!", result });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.putCategory = async (req, res, next) => {
    const { name, color } = req.body;
    const { id }          = req.params;
    if (!(name && color && id)) {
        return errorHandling(next, { message: "La catégorie doit avoir un nom, une couleur et un id." });
    }
    try {
        const category = await Categories.findOne({ where: { id } });
        if (!category) {
            return errorHandling(next, { message: "La catégorie n'existe pas." });
        }
        category.name = name;
        category.color = color;
        const result = await category.save();
        return res.status(200).json({ message: "La catégorie a bien été modifiée!", result });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await Categories.findOne({ where: { id } });
        if (!category) {
            return errorHandling(next, { message: "La catégorie n'existe pas." });
        }
        await category.destroy();
        return res.status(200).json({ message: "La catégorie a bien été supprimée!" });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.getQuotes = (req, res, next) => {
    const page   = helperQueryNumber(req.query.page, 1);
    const limit  = helperQueryNumber(req.query.limit, 10);
    const offset = (page - 1) * limit;
    Quotes.findAndCountAll({
        limit, 
        offset, 
        where: { 
            isValidated: 0,
        },
        include: [
            { model: Users, attributes: ["name", "logo"] }
        ],
        order: [['createdAt', 'DESC']]
    })
        .then((result) => {
            const { count, rows } = result;
            const hasMore = (page * limit) < count;
            return res.status(200).json({ totalItems: count, hasMore, rows });
        })
        .catch((error) => {
            console.log(error);
            return errorHandling(next, serverError);
        });
}

exports.putQuote = async (req, res, next) => {
    const { id }      = req.params;
    const { isValid } = req.body;
    try {
        if (typeof isValid !== 'boolean') {
            return errorHandling(next, { message: "isValid doit être un booléen.", statusCode: 400 });
        }
        const quote = await Quotes.findOne({ where: { id, isValidated: 0 } });
        if (!quote) {
            return errorHandling(next, { message: "La citation n'existe pas (ou est déjà validé).", statusCode: 404 });
        }
        if (isValid) {
            quote.isValidated = true;
            const result = await quote.save();
            return res.status(200).json({ isValidated: true, message: "La citation a bien été validée!", result });
        } 

        await quote.destroy();
        return res.status(200).json({ isValidated: false, message: "La citation a bien été supprimée!" });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);   
    }
}