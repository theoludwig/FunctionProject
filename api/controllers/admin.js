const errorHandling   = require('../assets/utils/errorHandling');
const { serverError } = require('../assets/config/errors');
const Users           = require('../models/users');

exports.postFunction = (req, res, next) => {
    // TODO: Pouvoir créé une fonction
    res.status(200).json({ message: "test"});
}