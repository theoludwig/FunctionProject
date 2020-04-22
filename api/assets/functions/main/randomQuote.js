const errorHandling   = require('../../utils/errorHandling');
const { serverError } = require('../../config/errors');
const Quotes          = require('../../../models/quotes');
const Users           = require('../../../models/users');
const sequelize       = require('../../utils/database');

module.exports = randomQuote = async ({ res, next }, _argsObject) => {
    try {
        const quote = await Quotes.findOne({
            order: sequelize.random(),
            include: [
                { model: Users, attributes: ["name", "logo"] }
            ],
            attributes: {
                exclude: ["isValidated"]
            },
            where: { 
                isValidated: 1,
            }
        });
        return res.status(200).json(quote);
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}