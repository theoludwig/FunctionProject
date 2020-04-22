const errorHandling                   = require('../assets/utils/errorHandling');
const { serverError, requiredFields } = require('../assets/config/errors');
const Quotes                          = require('../models/quotes');
const Users                           = require('../models/users');
const helperQueryNumber               = require('../assets/utils/helperQueryNumber');

exports.getQuotes = (req, res, next) => {
    const page   = helperQueryNumber(req.query.page, 1);
    const limit  = helperQueryNumber(req.query.limit, 10);
    const offset = (page - 1) * limit;
    Quotes.findAndCountAll({
        limit, 
        offset, 
        where: { 
            isValidated: 1,
        },
        include: [
            { model: Users, attributes: ["name", "logo"] }
        ],
        attributes: {
            exclude: ["isValidated"]
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

exports.postQuote = (req, res, next) => {
    const { quote, author } = req.body;
    // S'il n'y a pas les champs obligatoire
    if (!(quote && author)) {
        return errorHandling(next, requiredFields);
    }
    Quotes.create({ quote, author, userId: req.userId })
        .then((_result) => {
            return res.status(200).json({ message: "La citation a bien été ajoutée, elle est en attente de confirmation d'un administrateur." });
        })
        .catch((error) => {
            console.log(error);
            return errorHandling(next, serverError);
        });
}