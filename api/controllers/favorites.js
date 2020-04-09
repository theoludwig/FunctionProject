const errorHandling   = require('../assets/utils/errorHandling');
const { serverError } = require('../assets/config/errors');
const Favorites       = require('../models/favorites');
const Functions       = require('../models/functions');

exports.getFavoriteByFunctionId = async (req, res, next) => {
    const { functionId } = req.params;
    const { userId }     = req;
    try {
        const favorite = await Favorites.findOne({ 
            where: {
                userId, 
                functionId
            } 
        });
        if (!favorite) {
            return res.status(200).json({ isFavorite: false });
        }
        return res.status(200).json({ isFavorite: true });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.postFavoriteByFunctionId = async (req, res, next) => {
    const { functionId } = req.params;
    const { userId }     = req;
    try {
        const resultFunction = await Functions.findOne({ where: { id: functionId } });
        if (!resultFunction) {
            return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
        }
        const favorite = await Favorites.findOne({ 
            where: {
                userId, 
                functionId
            } 
        });
        if (!favorite) {
            await Favorites.create({ userId, functionId });
            return res.status(201).json({ result: "Le favoris a bien été ajouté!" });
        }
        return errorHandling(next, { message: "La fonction est déjà en favoris.", statusCode: 400 });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.deleteFavoriteByFunctionId = async (req, res, next) => {
    const { functionId } = req.params;
    const { userId }     = req;
    try {
        const resultFunction = await Functions.findOne({ where: { id: functionId } });
        if (!resultFunction) {
            return errorHandling(next, { message: "La fonction n'existe pas.", statusCode: 404 });
        }
        const favorite = await Favorites.findOne({ 
            where: {
                userId, 
                functionId
            } 
        });
        if (!favorite) {
            return errorHandling(next, { message: "Le fonction n'est pas en favoris.", statusCode: 400 });
        }
        await favorite.destroy();
        return res.status(200).json({ message: "Le fonction a bien été supprimé des favoris." });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}