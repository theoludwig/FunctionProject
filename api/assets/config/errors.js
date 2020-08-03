const errors = {
  generalError: {
    message: "Vous n'avez pas rentré de valeur valide.",
    statusCode: 400
  },

  serverError: {
    message: "Le serveur n'a pas pu traiter votre requête.",
    statusCode: 500
  },

  requiredFields: {
    message: 'Vous devez remplir tous les champs...',
    statusCode: 400
  }
}

module.exports = errors
