const functionToExecute = require('../assets/functions/functionObject');
const sendResponse      = require('../assets/utils/sendResponse');

exports.executeFunctionName = (req, res, _next) => {
    const functionOutput = functionToExecute(req.params.functionName);
    if (functionOutput !== undefined) {
        return functionOutput(res, req.body);
    }  
    return sendResponse(res, { result: "La fonction n'existe pas.", httpStatus: 404 });
}