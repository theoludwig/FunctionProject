const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts')
module.exports = withFonts(withCSS())
