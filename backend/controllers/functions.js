const errorHandling     = require('../assets/utils/errorHandling');
const functionToExecute = require('../assets/functions/functionObject');

exports.executeFunctionName = (req, res, next) => {
    const functionOutput = functionToExecute(req.params.functionName);
    if (functionOutput !== undefined) {
        return functionOutput({ res, next }, req.body);
    }  
    return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
}