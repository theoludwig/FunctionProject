const validator = require('validator')
const errorHandling = require('../../utils/errorHandling')
const { requiredFields, serverError } = require('../../config/errors')
const shortLinks = require('../../../models/short_links')

const shortLinkBaseURL = 'https://s.divlo.fr'

module.exports = async ({ res, next }, argsObject) => {
  let { url, shortcutName } = argsObject

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
    const urlInDatabase = await shortLinks.findOne({ where: { url } })
    if (urlInDatabase) {
      const urlShort = `${shortLinkBaseURL}/${urlInDatabase.shortcut}`
      return errorHandling(next, {
        message: `L'url a déjà été raccourcie... <br/> <br/> <a target="_blank" rel="noopener noreferrer" href="${urlShort}">${urlShort}</a>`,
        statusCode: 400
      })
    }

    // Si le nom du raccourci existe déjà
    const shortcutInDatabase = await shortLinks.findOne({
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
    const result = await shortLinks.create({ url, shortcut: shortcutName })
    const shortcutLinkResult = `${shortLinkBaseURL}/${result.shortcut}`
    return res.status(200).json({
      resultHTML: `URL Raccourcie : <br/> <br/> <a target="_blank" rel="noopener noreferrer" href="${shortcutLinkResult}">${shortcutLinkResult}</a>`,
      result: shortcutLinkResult
    })
  } catch (error) {
    console.log(error)
    return errorHandling(next, serverError)
  }
}
