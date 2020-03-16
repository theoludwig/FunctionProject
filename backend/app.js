/* Modules */
const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');

/* Files Imports & Variables */
const { PORT } = require('./assets/config/config');
const app      = express();

/* Middlewares */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

/* Routes */ 
app.get('/', (_req, res) => res.send('Hello world!'));

/* Server */
app.listen(PORT, () => console.log('\x1b[36m%s\x1b[0m', `Started on port ${PORT}.`));