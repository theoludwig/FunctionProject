const axios              = require('axios');
const errorHandling      = require('../../utils/errorHandling');
const { requiredFields } = require('../../config/errors');

/* OUTPUTS */
exports.convertCurrencyOutput = ({ res, next }, argsObject) => {
    let { number, baseCurrency, finalCurrency } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(number && baseCurrency && finalCurrency)) {
        return errorHandling(next, requiredFields);
    }
    
    // Si ce n'est pas un nombre
    number = parseFloat(number);
    if (isNaN(number)) {
        return  errorHandling(next, { message: "Veuillez rentré un nombre valide.", statusCode: 400 });
    }

    axios.get(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`)
        .then((response) => {
            const rate = response.data.rates[finalCurrency];
            const result = rate * number;
            const dateObject = new Date(response.data.date);
            const year = dateObject.getFullYear();
            const day = ('0'+(dateObject.getDate())).slice(-2);
            const month = ('0'+(dateObject.getMonth()+1)).slice(-2);
            return res.status(200).json({ date: `${day}/${month}/${year}`, result });
        })
        .catch(() => errorHandling(next, { message: "La devise n'existe pas.", statusCode: 404 }));
}