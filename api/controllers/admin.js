const path                 = require('path');
const fs                   = require('fs');
const { validationResult } = require('express-validator');
const errorHandling        = require('../assets/utils/errorHandling');
const { serverError }      = require('../assets/config/errors');
const Functions            = require('../models/functions');

exports.postFunction = (req, res, next) => {
    const { title, slug, description, type, categorieId } = req.body;
    const image = req.files.image;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return errorHandling(next, { message: errors.array()[0].msg, statusCode: 400 });
    }
    if (!image || image.truncated && (
        image.mimetype !== 'image/png' || 
        image.mimetype !== 'image/jpg' || 
        image.mimetype !== 'image/jpeg'
    )) {
        return errorHandling(next, { message:"La fonction doit avoir une image valide.", statusCode: 400 });
    }
    const imageName = slug + image.name;
    image.mv(path.join(__dirname, '..', 'assets', 'images', 'functions') + '/' + imageName, async (error) => {
        if (error) return errorHandling(next, serverError);
        try {
            await Functions.create({ title, slug, description, type, categorieId, image: `/images/functions/${imageName}` });
            return res.status(201).json({ message: "La fonction a été correctement ajouté!"});
        } catch (error) {
            console.log(error);
            errorHandling(next, serverError);
        }
    });
}

exports.deleteFunction = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await Functions.findOne({ where: { id } });
        if (!result) {
            return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
        }
        if (result.image !== "/images/functions/default.png") {
            const filePath = path.join(__dirname, '..', 'assets', result.image);
            fs.unlinkSync(filePath); // supprime le fichier
        }
        await Functions.destroy({ where: { id } });
        res.status(200).json({ message: "La fonction a été correctement supprimé!"});
    } catch (error) {
        console.log(error);
        errorHandling(next, serverError);
    }
}