const fs = require('fs')
const path = require('path')

function deleteFilesNameStartWith (pattern, dirPath, callback) {
  fs.readdir(path.resolve(dirPath), (_error, fileNames) => {
    for (const name of fileNames) {
      const splitedName = name.split('.')
      if (splitedName.length === 2) {
        const fileName = splitedName[0]
        if (fileName === pattern && name !== 'default.png') {
          return fs.unlink(path.join(dirPath, name), callback)
        }
      }
    }
    return callback()
  })
}

module.exports = deleteFilesNameStartWith
