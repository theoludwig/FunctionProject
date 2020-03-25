/* Modules */
require('dotenv').config();
const path    = require('path');
const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');
const morgan  = require('morgan');

/* Files Imports & Variables */
const sequelize     = require('./assets/utils/database');
const { PORT }      = require('./assets/config/config');
const errorHandling = require('./assets/utils/errorHandling');
const app           = express();

/* Middlewares */
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

/* Routes */ 
app.use('/images', express.static(path.join(__dirname, "assets", "images")));
app.use('/functions', require('./routes/functions'));
app.use('/categories', require('./routes/categories'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));

/* Errors Handling */
app.use((_req, _res, next) => errorHandling(next, { statusCode: 404, message: "La route n'existe pas!" })); // 404
app.use((error, _req, res, _next) => {
    console.log(error);
    const { statusCode, message } = error;
    return res.status(statusCode || 500).json({ message });
});

/* Database Relations */
const Functions  = require('./models/functions');
const Categories = require('./models/categories');

Categories.hasOne(Functions, { constraints: true, onDelete: 'CASCADE'});
Functions.belongsTo(Categories);

/* Server */
// sequelize.sync({ force: true })
sequelize.sync()
    .then(() => {
        app.listen(PORT, () =>  console.log('\x1b[36m%s\x1b[0m', `Started on port ${PORT}.`));
    })
    .catch((error) => console.log(error));