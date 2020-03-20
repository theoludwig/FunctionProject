const errorHandling     = require('../assets/utils/errorHandling');
const { serverError }   = require('../assets/config/errors');
const Functions         = require('../models/functions');
const Categories        = require('../models/categories');
const functionToExecute = require('../assets/functions/functionObject');

exports.getFunctions = (req, res, next) => {
    // TODO: Trier et chercher par catégories
    let page = 1;
    let limit = 10;
    if (req.query.page && !isNaN(req.query.page)) {
        page = parseInt(req.query.page);
    }
    if (req.query.limit && !isNaN(req.query.limit)) {
        limit = parseInt(req.query.limit);
    }
    const offset = (page - 1) * limit;
    Functions.findAndCountAll({ 
        limit, 
        offset, 
        where: { isOnline: 1 },
        include: [
            { model: Categories, attributes: ["name", "color"] }
        ] 
    })
        .then((result) => {
            const { count, rows } = result;
            const hasMore = (page * limit) < count;
            res.status(200).json({ totalItems: count,  hasMore, rows });
        })
        .catch((error) => {
            console.log(error);
            errorHandling(next, serverError);
        });
}

exports.executeFunctionName = (req, res, next) => {
    const functionOutput = functionToExecute(req.params.functionName);
    if (functionOutput !== undefined) {
        return functionOutput({ res, next }, req.body);
    }  
    return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
}