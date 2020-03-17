const { randomNumberOutput }                                     = require('./main/randomNumber');
const { convertArabicToRomanOutput, convertRomanToArabicOutput } = require('./main/convertRomanArabicNumbers');

const functionObject = {
    randomNumber: {
        functionOutput: randomNumberOutput,
        args:  ["min", "max"]
    },
    convertArabicToRoman: {
        functionOutput: convertArabicToRomanOutput,
        args: ["number"]
    },
    convertRomanToArabic: {
        functionOutput: convertRomanToArabicOutput,
        args: ["romanNumber"]
    }
};

// Choisi la fonction à exécuter
function functionToExecute(option) {
    return functionObject[option];
}

module.exports = functionToExecute;