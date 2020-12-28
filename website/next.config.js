const withFonts = require('next-fonts')
const withPWA = require('next-pwa')

module.exports = withFonts(
  withPWA({
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      dest: 'public'
    }
  })
)
