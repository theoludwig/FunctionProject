const errorHandling      = require('../../utils/errorHandling');
const moment             = require('moment');
const { requiredFields } = require('../../config/errors');

function calculateAge(currentDate, { birthDateDay, birthDateMonth, birthDateYear }) {
    const day   = currentDate.getDate();
    const month = currentDate.getMonth();
    const currentDateMoment = moment([currentDate.getFullYear(), month, day]);
    const birthDateMoment   = moment([birthDateYear, birthDateMonth - 1, birthDateDay]);

    // Calcule l'âge - Moment.js
    const ageYears = currentDateMoment.diff(birthDateMoment, 'year');
    birthDateMoment.add(ageYears, 'years');
    const ageMonths = currentDateMoment.diff(birthDateMoment, 'months');
    birthDateMoment.add(ageMonths, 'months');
    const ageDays = currentDateMoment.diff(birthDateMoment, 'days');

    const isBirthday = (birthDateDay === day && birthDateMonth === (month + 1)); 
    return { ageYears, ageMonths, ageDays, isBirthday };
}

/* OUTPUTS */
exports.calculateAgeOutput = ({ res, next }, argsObject) => {
    let { birthDateDay, birthDateMonth, birthDateYear } = argsObject;
    birthDateDay   = parseInt(birthDateDay);
    birthDateMonth = parseInt(birthDateMonth);
    birthDateYear  = parseInt(birthDateYear);
    
    // S'il n'y a pas les champs obligatoire
    if (!(birthDateDay && birthDateMonth && birthDateYear)) {
        return errorHandling(next, requiredFields);
    }
    
    // Si ce n'est pas une date valide
    const currentDate = new Date();
    const birthDate   = new Date(birthDateYear, birthDateMonth - 1, birthDateDay);
    if (!(currentDate > birthDate)) {
        return errorHandling(next, { message: "Veuillez rentré une date valide...", statusCode: 400 });
    }

    return res.status(200).json(calculateAge(currentDate, { birthDateYear, birthDateMonth, birthDateDay }));
}