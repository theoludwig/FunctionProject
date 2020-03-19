const axios               = require('axios');
const sendResponse       = require('../../utils/sendResponse');
const { requiredFields } = require('../../config/errors');

/* OUTPUTS */
exports.convertCurrencyOutput = (res, argsObject) => {
    let { number, baseCurrency, finalCurrency } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(number && baseCurrency && finalCurrency)) {
        return sendResponse(res, requiredFields);
    }
    
    // Si ce n'est pas un nombre
    number = parseFloat(number);
    if (isNaN(number)) {
        return sendResponse(res, { result: "Veuillez rentré un nombre valide.", httpStatus: 400 });
    }

    axios.get(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`)
        .then((response) => {
            const rate = response.data.rates[finalCurrency];
            const result = rate * number;
            const dateObject = new Date(response.data.date);
            const year = dateObject.getFullYear();
            const day = ('0'+(dateObject.getDate())).slice(-2);
            const month = ('0'+(dateObject.getMonth()+1)).slice(-2);
            return sendResponse(res, { result: { date: `${day}/${month}/${year}`, result } }, true);
        })
        .catch(() => sendResponse(res, { result: "La devise n'existe pas.", httpStatus: 404 }));
}