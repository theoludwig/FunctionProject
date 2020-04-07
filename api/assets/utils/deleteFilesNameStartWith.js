const fs   = require("fs");
const path = require("path");

function deleteFilesNameStartWith(pattern, dirPath = __dirname) {
    // Get all file names in directory
    fs.readdir(path.resolve(dirPath), (err, fileNames) => {
        if (err) throw err;
        console.log(dirPath);
        // Iterate through the found file names
        for (const name of fileNames) {
            // If file name matches the pattern
            if (name.startsWith(pattern)) {
                console.log(name)
                fs.unlinkSync(path.join(dirPath, name));
            }
        }
    });
}

module.exports = deleteFilesNameStartWith;