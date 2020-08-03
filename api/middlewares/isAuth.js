const jwt = require('jsonwebtoken')
const errorHandling = require('../assets/utils/errorHandling')
const { JWT_SECRET } = require('../assets/config/config')

module.exports = (req, _res, next) => {
  const token = req.get('Authorization')
  if (!token) {
    return errorHandling(next, { message: 'Vous devez être connecter pour effectuer cette opération.', statusCode: 403 })
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return errorHandling(next, { message: 'Vous devez être connecter pour effectuer cette opération.', statusCode: 403 })
  }

  if (!decodedToken) {
    return errorHandling(next, { message: 'Vous devez être connecter pour effectuer cette opération.', statusCode: 403 })
  }

  req.userId = decodedToken.userId
  next()
}
