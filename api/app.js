/* Modules */
require('dotenv').config()
const path = require('path')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const { redirectToHTTPS } = require('express-http-to-https')
const rateLimit = require('express-rate-limit')

/* Files Imports & Variables */
const sequelize = require('./assets/utils/database')
const { PORT } = require('./assets/config/config')
const errorHandling = require('./assets/utils/errorHandling')
const isAuth = require('./middlewares/isAuth')
const isAdmin = require('./middlewares/isAdmin')
const app = express()

/* Middlewares */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else if (process.env.NODE_ENV === 'production') {
  app.use(redirectToHTTPS())
  const requestPerSecond = 2
  const seconds = 60
  const windowMs = seconds * 1000
  app.enable('trust proxy')
  app.use(
    rateLimit({
      windowMs,
      max: seconds * requestPerSecond,
      handler: (_req, res) => {
        return res.status(429).json({ message: 'Too many requests' })
      }
    })
  )
}
app.use(helmet())
app.use(cors())
app.use(express.json())

/* Routes */
app.use('/images', express.static(path.join(__dirname, 'assets', 'images')))
app.use('/functions', require('./routes/functions'))
app.use('/categories', require('./routes/categories'))
app.use('/users', require('./routes/users'))
app.use('/admin', isAuth, isAdmin, require('./routes/admin'))
app.use('/favorites', require('./routes/favorites'))
app.use('/comments', require('./routes/comments'))
app.use('/quotes', require('./routes/quotes'))
app.use('/tasks', require('./routes/tasks'))
app.use('/links', require('./routes/links_shortener'))

/* Errors Handling */
app.use((_req, _res, next) =>
  errorHandling(next, { statusCode: 404, message: "La route n'existe pas!" })
)
app.use((error, _req, res, _next) => {
  console.log(error)
  const { statusCode, message } = error
  return res.status(statusCode || 500).json({ message })
})

/* Database Relations */
const Functions = require('./models/functions')
const Categories = require('./models/categories')
const Users = require('./models/users')
const Favorites = require('./models/favorites')
const Comments = require('./models/comments')
const Quotes = require('./models/quotes')
const Tasks = require('./models/tasks')
const ShortLinks = require('./models/short_links')

// A function has a category
Categories.hasOne(Functions, { constraints: true, onDelete: 'CASCADE' })
Functions.belongsTo(Categories)

// Users can have favorites functions
Users.hasMany(Favorites)
Favorites.belongsTo(Users, { constraints: false })
Functions.hasMany(Favorites)
Favorites.belongsTo(Functions, { constraints: false })

// Users can post comments on functions
Users.hasMany(Comments)
Comments.belongsTo(Users, { constraints: false })
Functions.hasMany(Comments)
Comments.belongsTo(Functions, { constraints: false })

// Users can suggest new quotes
Users.hasMany(Quotes)
Quotes.belongsTo(Users, { constraints: false })

// Users can have tasks
Users.hasMany(Tasks)
Tasks.belongsTo(Users, { constraints: false })

// Users can have links
Users.hasMany(ShortLinks)
ShortLinks.belongsTo(Users, { constraints: false })

/* Server */
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log('\x1b[36m%s\x1b[0m', `Started on port ${PORT}.`)
    )
  })
  .catch(error => console.log(error))
