const nodemailer     = require('nodemailer');
const { EMAIL_INFO } = require('./config');

const transporter = nodemailer.createTransport(EMAIL_INFO);

module.exports = transporter;