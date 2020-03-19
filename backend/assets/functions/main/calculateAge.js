const sendResponse       = require('../../utils/sendResponse');
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
exports.calculateAgeOutput = (res, argsObject) => {
    let { birthDateDay, birthDateMonth, birthDateYear } = argsObject;
    birthDateDay   = parseInt(birthDateDay);
    birthDateMonth = parseInt(birthDateMonth);
    birthDateYear  = parseInt(birthDateYear);
    
    // S'il n'y a pas les champs obligatoire
    if (!(birthDateDay && birthDateMonth && birthDateYear)) {
        return sendResponse(res, requiredFields);
    }
    
    // Si ce n'est pas une date valide
    const currentDate = new Date();
    const birthDate   = new Date(birthDateYear, birthDateMonth - 1, birthDateDay);
    if (!(currentDate > birthDate)) {
        return sendResponse(res, { result: "Veuillez rentré une date valide...", httpStatus: 400 });
    }

    const result = calculateAge(currentDate, { birthDateYear, birthDateMonth, birthDateDay });
    return sendResponse(res, { result }, true);
}