/* Modules */
const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');
const morgan  = require('morgan');

/* Files Imports & Variables */
const { PORT }        = require('./assets/config/config');
const { serverError } = require('./assets/config/errors');
const sendResponse    = require('./assets/utils/sendResponse');
const app             = express();

/* Middlewares */
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

/* Routes */ 
app.use('/functions', require('./routes/functions'));

/* Errors Handling */
app.use((_req, res, _next) => sendResponse(res, { result: "La route n'existe pas!", httpStatus: 404 })); // 404
app.use((error, _req, res, _next) => { console.log(error); return sendResponse(res, serverError); }); // 500

/* Server */
app.listen(PORT, () => console.log('\x1b[36m%s\x1b[0m', `Started on port ${PORT}.`));