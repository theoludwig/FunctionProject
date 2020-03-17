const functionToExecute = require('../assets/functions/functionObject');
const sendResponse      = require('../assets/utils/sendResponse');

exports.executeFunctionName = (req, res, _next) => {
    const functionObject = functionToExecute(req.params.functionName);
    if (functionObject !== undefined) {
        return functionObject.functionOutput(res, req.body);
    }  
    return sendResponse(res, { result: "La fonction n'existe pas.", httpStatus: 404 });
}