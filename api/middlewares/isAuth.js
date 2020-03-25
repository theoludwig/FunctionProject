const jwt             = require('jsonwebtoken');
const errorHandling   = require('../assets/utils/errorHandling');
const { serverError } = require('../assets/config/errors');
const { JWT_SECRET }  = require('../assets/config/config');

module.exports = (req, _res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return errorHandling(next, { message: "Vous n'êtes pas connecté.", statusCode: 401 });
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return errorHandling(next, serverError);
    }

    if (!decodedToken) {
        return errorHandling(next, { message: "Vous n'êtes pas connecté.", statusCode: 401 });
    }

    req.userId = decodedToken.userId;
    next();
}