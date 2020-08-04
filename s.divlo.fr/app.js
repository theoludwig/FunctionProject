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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

/* Middlewares */
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(redirectToHTTPS([/localhost:(\d{4})/]))

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
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `Started on port ${PORT}.`)
})
