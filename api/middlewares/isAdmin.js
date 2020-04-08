const errorHandling   = require('../assets/utils/errorHandling');
const { serverError } = require('../assets/config/errors');
const Users           = require('../models/users');

module.exports = (req, _res, next) => {
    if (!req.userId) {
        return errorHandling(next, { message: "Vous n'êtes pas connecté.", statusCode: 403 });
    }
    Users.findOne({ where: { id: req.userId } })
        .then((user) => {
            if (!user) {
                return errorHandling(next, { message: "Le mot de passe ou l'adresse email n'est pas valide.", statusCode: 403 });
            }
            if (!user.isAdmin) {
                return errorHandling(next, { message: "Vous n'êtes pas administrateur.", statusCode: 403 });
            }
            next();
        })
        .catch((error) => {
            console.log(error);
            errorHandling(next, serverError);
        });
}