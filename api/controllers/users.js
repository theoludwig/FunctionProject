const path                           = require('path');
const { validationResult }           = require('express-validator');
const bcrypt                         = require('bcryptjs');
const jwt                            = require('jsonwebtoken');
const uuid                           = require('uuid');
const errorHandling                  = require('../assets/utils/errorHandling');
const { serverError, generalError }  = require('../assets/config/errors');
const { JWT_SECRET, FRONT_END_HOST } = require('../assets/config/config');
const transporter                    = require('../assets/config/transporter');
const { EMAIL_INFO, HOST }           = require('../assets/config/config');
const { emailTemplate }              = require('../assets/config/emails');
const Users                          = require('../models/users');
const Favorites                      = require('../models/favorites');
const Functions                      = require('../models/functions');
const Categories                     = require('../models/categories');
const Comments                       = require('../models/comments');
const deleteFilesNameStartWith       = require('../assets/utils/deleteFilesNameStartWith');

async function handleEditUser(res, { name, email, biography, isPublicEmail }, userId, logoName) {
    const user = await Users.findOne({ where: { id: userId } });
    user.name = name;
    if (user.email !== email) {
        const tempToken = uuid.v4();
        user.email = email;
        user.isConfirmed = false;
        user.tempToken = tempToken;
        await transporter.sendMail({
            from: `"FunctionProject" <${EMAIL_INFO.auth.user}>`,
            to: email,
            subject: "FunctionProject - Confirmer l'email",
            html: emailTemplate("Veuillez confirmer l'email", "Oui, je confirme.", `${HOST}/users/confirm-email/${tempToken}`, "Si vous avez reçu ce message par erreur, il suffit de le supprimer. Votre email ne serez pas confirmé si vous ne cliquez pas sur le lien de confirmation ci-dessus.")
        });
    }
    if (biography != undefined) {
        user.biography = biography;
    }
    user.isPublicEmail = isPublicEmail;
    if (logoName != undefined) {
        user.logo = `/images/users/${logoName}`;
    }
    await user.save();
    return res.status(200).json({ id: user.id, name: user.name, email: user.email, biography: user.biography, logo: user.logo, isPublicEmail: user.isPublicEmail, isAdmin: user.isAdmin, createdAt: user.createdAt });
}

exports.putUser = (req, res, next) => {
    const { name, email, biography, isPublicEmail } = req.body;
    const logo = req.files.logo;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorHandling(next, { message: errors.array()[0].msg, statusCode: 400 });
    }
    if (logo != undefined) {
        if (!logo || logo.truncated && (
            logo.mimetype !== 'image/png' || 
            logo.mimetype !== 'image/jpg' || 
            logo.mimetype !== 'image/jpeg' ||
            logo.mimetype !== 'image/gif'
        )) {
            return errorHandling(next, { message:"Le profil doit avoir une image valide.", statusCode: 400 });
        }
        const logoName = name + req.userId + uuid.v4() + logo.name;
        // Supprime les anciens logo
        try {
            deleteFilesNameStartWith(`${name + req.userId}`, path.join(__dirname, '..', 'assets', 'images', 'users'));
        } catch (error) {
            console.log(error);
            return errorHandling(next, serverError);
        }
        logo.mv(path.join(__dirname, '..', 'assets', 'images', 'users') + '/' + logoName, async (error) => {
            if (error) return errorHandling(next, serverError);
            try {
                return handleEditUser(res, { name, email, biography, isPublicEmail }, req.userId, logoName);
            } catch (error) {
                console.log(error);
                return errorHandling(next, serverError);
            }
        });
    } else {
        try {
            return handleEditUser(res, { name, email, biography, isPublicEmail }, req.userId, null);
        } catch (error) {
            console.log(error);
            return errorHandling(next, serverError);
        }
    }
}

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorHandling(next, { message: errors.array()[0].msg, statusCode: 400 });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const tempToken = uuid.v4();
        await Users.create({ email, name, password: hashedPassword, tempToken });
        await transporter.sendMail({
            from: `"FunctionProject" <${EMAIL_INFO.auth.user}>`,
            to: email,
            subject: "FunctionProject - Confirmer l'inscription",
            html: emailTemplate("Veuillez confirmer l'inscription", "Oui, je m'inscris.", `${HOST}/users/confirm-email/${tempToken}`, "Si vous avez reçu ce message par erreur, il suffit de le supprimer. Vous ne serez pas inscrit si vous ne cliquez pas sur le lien de confirmation ci-dessus.")
        });
        return res.status(201).json({ result: "Vous y êtes presque, veuillez vérifier vos emails pour confirmer l'inscription." });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorHandling(next, { message: errors.array()[0].msg, statusCode: 400 });
    }
    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return errorHandling(next, { message: "Le mot de passe ou l'adresse email n'est pas valide.", statusCode: 400 });
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return errorHandling(next, { message: "Le mot de passe ou l'adresse email n'est pas valide.", statusCode: 400 });
        }
        if (!user.isConfirmed) {
            return errorHandling(next, { message: "Vous devez valider votre adresse email pour votre première connexion.", statusCode: 400 });
        }
        const token = jwt.sign({ 
            email: user.email, userId: user.id
        }, JWT_SECRET, { expiresIn: '6h' });
        return res.status(200).json({ token, id: user.id, name: user.name, email: user.email, biography: user.biography, logo: user.logo, isPublicEmail: user.isPublicEmail, isAdmin: user.isAdmin, createdAt: user.createdAt });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.confirmEmail = async (req, res, next) => {
    const { tempToken } = req.params;
    if (!tempToken) {
        return errorHandling(next, generalError);
    }
    try {
        const user = await Users.findOne({ where: { tempToken, isConfirmed: false } });
        if (!user) {
            return errorHandling(next, { message: "Le token n'est pas valide.", statusCode: 400 });
        }
        user.tempToken = null;
        user.isConfirmed = true;
        await user.save();
        return res.redirect(`${FRONT_END_HOST}/login?isConfirmed=true`);
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.resetPassword = async (req, res, next) => {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorHandling(next, { message: errors.array()[0].msg, statusCode: 400 });
    }
    try {
        const user = await Users.findOne({ where: { email, tempToken: null } });
        if (!user) {
            return errorHandling(next, { message: "L'adresse email n'existe pas ou une demande est déjà en cours.", statusCode: 400 });
        }
        const tempToken = uuid.v4();
        user.tempExpirationToken = Date.now() + 3600000; // 1 heure
        user.tempToken = tempToken;
        await user.save();
        await transporter.sendMail({
            from: `"FunctionProject" <${EMAIL_INFO.auth.user}>`,
            to: email,
            subject: "FunctionProject - Réinitialisation du mot de passe",
            html: emailTemplate("Veuillez confirmer la réinitialisation du mot de passe", "Oui, je change mon mot de passe.", `${FRONT_END_HOST}/newPassword?token=${tempToken}`, "Si vous avez reçu ce message par erreur, il suffit de le supprimer. Votre mot de passe ne sera pas réinitialiser si vous ne cliquez pas sur le lien ci-dessus. Par ailleurs, pour la sécurité de votre compte, la réinitialisation du mot de passe est disponible pendant un délai de 1 heure, passez ce temps, la réinitialisation ne sera plus valide.")
        });
        return res.status(200).json({ result: "Demande de réinitialisation du mot de passe réussi, veuillez vérifier vos emails!" });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.newPassword = async (req, res, next) => {
    const { tempToken, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorHandling(next, { message: errors.array()[0].msg, statusCode: 400 });
    }
    try {
        const user = await Users.findOne({ where: { tempToken } });
        if (!user && parseInt(tempExpirationToken) < Date.now()) {
            return errorHandling(next, { message: "Le token n'est pas valide.", statusCode: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.tempToken = null;
        user.tempExpirationToken = null;
        await user.save();
        return res.status(200).json({ result: "Le mot de passe a bien été modifié!" });
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}

exports.getUserInfo = async (req, res, next) => {
    const { name } = req.params;
    try {
        const user = await Users.findOne({ 
            where: { name, isConfirmed: true },
            attributes: {
                exclude: ["updatedAt", "isAdmin", "isConfirmed", "password", "tempToken", "tempExpirationToken"]
            }, 
        });
        if (!user) {
            return errorHandling(next, { message: "L'utilisateur n'existe pas.", statusCode: 404 });
        }
        const favorites = await Favorites.findAll({ 
            where: { userId: user.id },
            include: [
                { model: Functions, attributes: { exclude: ["updatedAt", "utilizationForm", "article", "isOnline"] }, include: { model: Categories, attributes: ["name", "color"] } }
            ] 
        });
        const favoritesArray = favorites.map((favorite) => favorite.function);
        const comments = await Comments.findAll({
            limit: 10,
            where: { userId: user.id },
            include: [
                { model: Functions, attributes: { exclude: ["updatedAt", "utilizationForm", "article", "isOnline"] } }
            ],
            order: [['createdAt', 'DESC']]
        });
        const commentsArray = comments.map((commentObject) => {
            return {
                id: commentObject.id,
                message: commentObject.message,
                createdAt: commentObject.createdAt,
                function: commentObject.function.dataValues
            };
        });
        const userObject = {
            // Si Public Email
            ... (user.isPublicEmail) && { email: user.email },
            isPublicEmail: user.isPublicEmail,
            name: user.name,
            biography: user.biography,
            logo: user.logo,
            createdAt: user.createdAt,
            favoritesArray,
            commentsArray
        };
        return res.status(200).json(userObject);
    } catch (error) {
        console.log(error);
        return errorHandling(next, serverError);
    }
}