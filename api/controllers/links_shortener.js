const validator = require('validator')
const errorHandling = require('../assets/utils/errorHandling')
const { requiredFields, serverError } = require('../assets/config/errors')
const ShortLinks = require('../models/short_links')
const getPagesHelper = require('../assets/utils/getPagesHelper')
const Sequelize = require('sequelize')

const shortLinkBaseURL = 'https://s.divlo.fr'

exports.getLinks = async (req, res, next) => {
  const { userId } = req
  const options = {
    where: { userId },
    order: [['createdAt', 'DESC']]
  }
  return await getPagesHelper({ req, res, next }, ShortLinks, options)
}

exports.postLink = async (req, res, next) => {
  const { userId } = req
  let { url, shortcutName } = req.body

  // S'il n'y a pas les champs obligatoire
  if (!(url && shortcutName)) {
    return errorHandling(next, requiredFields)
  }

  // Si ce n'est pas une url
  if (!validator.isURL(url)) {
    return errorHandling(next, {
      message: 'Veuillez entré une URL valide.',
      statusCode: 400
    })
  }

  // Si ce n'est pas de type slug
  if (!validator.isSlug(shortcutName)) {
    return errorHandling(next, {
      message:
        "Le nom de votre raccourci doit être de type slug (ne pas contenir d'espaces, ni de caractères spéciaux).",
      statusCode: 400
    })
  }

  // Sanitize shortcutName
  shortcutName = validator.escape(shortcutName)
  shortcutName = validator.trim(shortcutName)
  shortcutName = validator.blacklist(shortcutName, ' ')

  try {
    // Si l'url a déjà été raccourcie
    const urlInDatabase = await ShortLinks.findOne({ where: { url } })
    if (urlInDatabase) {
      const urlShort = `${shortLinkBaseURL}/${urlInDatabase.shortcut}`
      return errorHandling(next, {
        message: `L'url a déjà été raccourcie... <br/> <br/> <a target="_blank" rel="noopener noreferrer" href="${urlShort}">${urlShort}</a>`,
        statusCode: 400
      })
    }

    // Si le nom du raccourci existe déjà
    const shortcutInDatabase = await ShortLinks.findOne({
      where: { shortcut: shortcutName }
    })
    if (shortcutInDatabase) {
      const urlShort = `${shortLinkBaseURL}/${shortcutInDatabase.shortcut}`
      return errorHandling(next, {
        message: `Le nom du raccourci a déjà été utilisé... <br/> <br/> <a target="_blank" rel="noopener noreferrer" href="${urlShort}">${urlShort}</a>`,
        statusCode: 400
      })
    }

    // Ajout du lien raccourci
    const result = await ShortLinks.create({
      url,
      shortcut: shortcutName,
      userId
    })
    const shortcutLinkResult = `${shortLinkBaseURL}/${result.shortcut}`
    return res.status(200).json({
      resultHTML: `URL Raccourcie : <br/> <br/> <a target="_blank" rel="noopener noreferrer" href="${shortcutLinkResult}">${shortcutLinkResult}</a>`,
      result: shortcutLinkResult,
      linkDatabase: result
    })
  } catch (error) {
    console.log(error)
    return errorHandling(next, serverError)
  }
}

exports.putLink = async (req, res, next) => {
  const { id } = req.params
  const { userId } = req
  let { url, shortcutName } = req.body

  // S'il n'y a pas les champs obligatoire
  if (!(url && shortcutName)) {
    return errorHandling(next, requiredFields)
  }

  // Si ce n'est pas une url
  if (!validator.isURL(url)) {
    return errorHandling(next, {
      message: 'Veuillez entré une URL valide.',
      statusCode: 400
    })
  }

  // Si ce n'est pas de type slug
  if (!validator.isSlug(shortcutName)) {
    return errorHandling(next, {
      message:
        "Le nom de votre raccourci doit être de type slug (ne pas contenir d'espaces, ni de caractères spéciaux).",
      statusCode: 400
    })
  }

  // Sanitize shortcutName
  shortcutName = validator.escape(shortcutName)
  shortcutName = validator.trim(shortcutName)
  shortcutName = validator.blacklist(shortcutName, ' ')

  try {
    // Si l'url a déjà été raccourcie par quelqu'un d'autre
    const urlInDatabase = await ShortLinks.findOne({
      where: { url, [Sequelize.Op.not]: { userId } }
    })
    if (urlInDatabase) {
      const urlShort = `${shortLinkBaseURL}/${urlInDatabase.shortcut}`
      return errorHandling(next, {
        message: `L'url a déjà été raccourcie... <br/> <br/> <a target="_blank" rel="noopener noreferrer" href="${urlShort}">${urlShort}</a>`,
        statusCode: 400
      })
    }

    // Si le nom du raccourci existe déjà par quelqu'un d'autre
    const shortcutInDatabase = await ShortLinks.findOne({
      where: { shortcut: shortcutName, [Sequelize.Op.not]: { userId } }
    })
    if (shortcutInDatabase) {
      const urlShort = `${shortLinkBaseURL}/${shortcutInDatabase.shortcut}`
      return errorHandling(next, {
        message: `Le nom du raccourci a déjà été utilisé... <br/> <br/> <a target="_blank" rel="noopener noreferrer" href="${urlShort}">${urlShort}</a>`,
        statusCode: 400
      })
    }

    // Modification du lien raccourci
    const result = await ShortLinks.findOne({
      where: { id, userId }
    })
    console.log(result)
    if (!result) {
      return errorHandling(next, {
        statusCode: 404,
        message: "Le raccourci n'existe pas..."
      })
    }
    result.url = url
    result.shortcut = shortcutName
    const { shortcut } = await result.save()
    const shortcutLinkResult = `${shortLinkBaseURL}/${shortcut}`
    return res.status(200).json({
      resultHTML: `URL Raccourcie : <br/> <br/> <a target="_blank" rel="noopener noreferrer" href="${shortcutLinkResult}">${shortcutLinkResult}</a>`,
      result: shortcutLinkResult
    })
  } catch (error) {
    console.log(error)
    return errorHandling(next, serverError)
  }
}

exports.deleteLink = async (req, res, next) => {
  const { id } = req.params
  const { userId } = req
  try {
    const linkResult = await ShortLinks.findOne({
      where: { id, userId }
    })
    if (!linkResult) {
      return errorHandling(next, {
        message: "Le lien raccourci n'existe pas.",
        statusCode: 404
      })
    }
    await linkResult.destroy()
    return res.status(200).json({ message: 'La lien a bien été supprimé!' })
  } catch (error) {
    console.log(error)
    return errorHandling(next, serverError)
  }
}
