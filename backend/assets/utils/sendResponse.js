/**
 * @description Envoie la réponse au client
 * @param {Response} res Objet réponse d'une réponse http/express
 * @param {Object} object { httpStatus, customProperties{Object}, result }
 * @param {Boolean} isSuccess
 */
function sendResponse (res, object, isSuccess = false) {
    res.status(object.httpStatus || 200).send({ isSuccess, ...object.customProperties, result: object.result }); 
}

module.exports = sendResponse;