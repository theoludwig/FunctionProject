const errorHandling = require('../assets/utils/errorHandling');
const Categories    = require('../models/categories');

exports.getCategories = (_req, res, next) => {
    Categories.findAll()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.log(error);
            errorHandling(next, serverError);
        });
}