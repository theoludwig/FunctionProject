const errorHandling      = require('../../utils/errorHandling');
const moment             = require('moment');
const { requiredFields } = require('../../config/errors');

function calculateAge(currentDate, { birthDateDay, birthDateMonth, birthDateYear }) {
    const day   = currentDate.getDate();
    const month = currentDate.getMonth();
    const currentDateMoment = moment([currentDate.getFullYear(), month, day]);
    const birthDateMoment   = moment([birthDateYear, birthDateMonth, birthDateDay]);

    // Calcule l'âge - Moment.js
    const ageYears = currentDateMoment.diff(birthDateMoment, 'year');
    birthDateMoment.add(ageYears, 'years');
    const ageMonths = currentDateMoment.diff(birthDateMoment, 'months');
    birthDateMoment.add(ageMonths, 'months');
    const ageDays = currentDateMoment.diff(birthDateMoment, 'days');

    const isBirthday = (birthDateDay === day && birthDateMonth === month); 
    return { ageYears, ageMonths, ageDays, isBirthday };
}

/* OUTPUTS */
module.exports = calculateAgeOutput = ({ res, next }, argsObject) => {
    let { birthDate } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(birthDate)) {
        return errorHandling(next, requiredFields);
    }

    const birthDateDay   = parseInt(birthDate.substring(0, 2));
    const birthDateMonth = parseInt((birthDate.substring(3, 5)) - 1);
    const birthDateYear  = parseInt(birthDate.substring(6, 10));
    
    // Si ce n'est pas une date valide
    const currentDate     = new Date();
    const birthDateObject = new Date(birthDateYear, birthDateMonth, birthDateDay);
    const result          = calculateAge(currentDate, { birthDateYear, birthDateMonth, birthDateDay });
    if ((currentDate < birthDateObject) || isNaN(result.ageYears)) {
        return errorHandling(next, { message: "Veuillez rentré une date valide...", statusCode: 400 });
    }
    
    let resultHTML;
    if (result.isBirthday) {
        resultHTML = `<p>Vous avez ${result.ageYears} ans. Joyeux Anniversaire! 🥳</p>`;
    } else {
        resultHTML = `<p>Vous avez ${result.ageYears} ans, ${result.ageMonths} mois et ${result.ageDays} jour(s).</p>`;
    }
    return res.status(200).json({ ...result, resultHTML });
}