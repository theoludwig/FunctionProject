const { randomNumber } = require('./randomNumber')
const errorHandling = require('../../utils/errorHandling')
const { serverError } = require('../../config/errors')
const { SCRAPER_API_KEY } = require('../../config/config')
const axios = require('axios')
const { JSDOM } = require('jsdom')

const subjectList = [
  'smartphone',
  'pc+gamer',
  'pc+portable',
  'TV',
  'casque',
  'clavier',
  'souris',
  'ecran',
  'jeux+vidéos'
]

function getRandomArrayElement (array) {
  return array[randomNumber(0, array.length - 1)]
}

async function getAmazonProductList (subject) {
  const url = `https://www.amazon.fr/s?k=${subject}`
  const { data } = await axios.get(
    `http://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=${url}`
  )
  const { document } = new JSDOM(data).window
  const amazonProductList = document.querySelectorAll('.s-result-item')
  const productsList = []
  for (const indexProduct in amazonProductList) {
    try {
      const elementProduct = amazonProductList[indexProduct]
      const productImage = elementProduct.querySelector('.s-image')
      const originalPrice = elementProduct.querySelector('.a-price-whole')
        .innerHTML
      productsList.push({
        name: productImage.alt,
        image: productImage.src,
        price: Number(originalPrice.replace(',', '.').replace(' ', ''))
      })
    } catch (_error) {
      continue
    }
  }
  return productsList
}

module.exports = async ({ res, next }, _argsObject) => {
  const subject = getRandomArrayElement(subjectList)
  try {
    const productsList = await getAmazonProductList(subject)
    const randomProduct = getRandomArrayElement(productsList)
    return res.status(200).json({ subject, ...randomProduct })
  } catch (error) {
    console.error(error)
    return errorHandling(next, serverError)
  }
}
