/* Modules */
require('dotenv').config()
const path = require('path')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { redirectToHTTPS } = require('express-http-to-https')
const mysql = require('mysql')

/* Files Imports & Variables */
const app = express()
const database = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT
})

/* Middlewares */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else if (process.env.NODE_ENV === 'production') {
  app.use(redirectToHTTPS())
}
app.use(helmet())
app.use(express.json())

/* EJS Template Engines */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/* Routes */
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (_req, res) => {
  return res.render('index')
})

app.get('/:shortcut', (req, res, next) => {
  const { shortcut } = req.params
  if (shortcut == null) {
    return res.redirect('/errors/404')
  }
  database.query(
    'SELECT * FROM short_links WHERE shortcut = ?',
    [shortcut],
    (error, [result]) => {
      if (error != null) {
        return next(error)
      }

      if (result == null) {
        return res.redirect('/error/404')
      }

      const count = (result.count += 1)
      database.query(
        'UPDATE short_links SET count = ? WHERE id = ?',
        [count, result.id],
        error => {
          if (error != null) {
            return next(error)
          }

          return res.redirect(result.url)
        }
      )
    }
  )
})

/* Errors */
app.use((_req, res) => {
  return res.status(404).render('errors')
})
app.use((error, _req, res) => {
  console.log(error)
  return res.status(500).render('errors')
})

/* Server */
const PORT = process.env.PORT || 7000
app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `Started on port ${PORT}.`)
})
