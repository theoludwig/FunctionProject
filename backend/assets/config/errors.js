const errors = {
    generalError: {
        result: "Vous n'avez pas rentré de valeur valide.",
        httpStatus: 400
    },

    serverError: {
        result: "Le serveur n'a pas pu traiter votre requête.",
        httpStatus: 500
    },

    requiredFields: {
        result: "Vous devez remplir tous les champs...",
        httpStatus: 400
    }
};

module.exports = errors;