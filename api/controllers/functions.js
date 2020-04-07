const errorHandling     = require('../assets/utils/errorHandling');
const { serverError }   = require('../assets/config/errors');
const Functions         = require('../models/functions');
const Categories        = require('../models/categories');
const functionToExecute = require('../assets/functions/functionObject');
const Sequelize         = require('sequelize');

function helperQueryNumber(value, defaultValue) {
    if (value && !isNaN(value)) return parseInt(value);
    return defaultValue;
}

exports.getFunctions = (req, res, next) => {
    const page       = helperQueryNumber(req.query.page, 1);
    const limit      = helperQueryNumber(req.query.limit, 10);
    const categoryId = helperQueryNumber(req.query.categoryId, 0);
    const search     = req.query.search.toLowerCase();
    const offset     = (page - 1) * limit;
    Functions.findAndCountAll({ 
        limit, 
        offset, 
        where: { 
            isOnline: 1,
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
            return res.status(200).json({ totalItems: count,  hasMore, rows });
        })
        .catch((error) => {
            console.log(error);
            return errorHandling(next, serverError);
        });
}

exports.getFunctionBySlug = (req, res, next) => {
    const { slug } = req.params;
    Functions.findOne({ 
        where: { slug, isOnline: 1 },
        attributes: {
            exclude: ["updatedAt", "isOnline"]
        },
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

exports.executeFunctionBySlug = (req, res, next) => {
    const functionOutput = functionToExecute(req.params.slug);
    if (functionOutput !== undefined) {
        return functionOutput({ res, next }, req.body);
    }  
    return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
}