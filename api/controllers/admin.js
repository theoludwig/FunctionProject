const path                 = require('path');
const fs                   = require('fs');
const { validationResult } = require('express-validator');
const errorHandling        = require('../assets/utils/errorHandling');
const { serverError }      = require('../assets/config/errors');
const Functions            = require('../models/functions');
const Categories           = require('../models/categories');
const helperQueryNumber    = require('../assets/utils/helperQueryNumber');
const Sequelize            = require('sequelize');

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
            await Functions.create({ title, slug, description, type, categorieId, image: `/images/functions/${imageName}` });
            return res.status(201).json({ message: "La fonction a été correctement ajouté!"});
        } catch (error) {
            console.log(error);
            return errorHandling(next, serverError);
        }
    });
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