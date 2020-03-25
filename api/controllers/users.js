const { validationResult }          = require('express-validator');
const bcrypt                        = require('bcryptjs');
const jwt                           = require('jsonwebtoken');
const uuid                          = require('uuid');
const errorHandling                 = require('../assets/utils/errorHandling');
const { serverError, generalError } = require('../assets/config/errors');
const { JWT_SECRET }                = require('../assets/config/config');
const transporter                   = require('../assets/config/transporter');
const { EMAIL_INFO, HOST }          = require('../assets/config/config');
const { signupEmail }               = require('../assets/config/emails');
const Users                         = require('../models/users');

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorHandling(next, { message: errors.array()[0].msg, statusCode: 400 });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const tempToken =  uuid.v4();
        await Users.create({ email, name, password: hashedPassword, tempToken });
        await transporter.sendMail({
            from: `"FunctionProject" <${EMAIL_INFO.auth.user}>`,
            to: email,
            subject: "FunctionProject - Confirmer l'inscription",
            html: signupEmail(`${HOST}/users/confirm-email/${tempToken}`)
        });
        return res.status(201).json({ result: "Vous y êtes presque, veuillez vérifier votre boite d'emails pour confirmer l'inscription." });
    } catch (error) {
        console.log(error);
        errorHandling(next, serverError);
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ where: { email, confirmed: true } });
        if (!user) {
            return errorHandling(next, { message: "Le mot de passe ou l'adresse email n'est pas valide.", statusCode: 400 });
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return errorHandling(next, { message: "Le mot de passe ou l'adresse email n'est pas valide.", statusCode: 400 });
        }
        const token = jwt.sign({ 
            email: user.email, userId: user.id
        }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token, id: user.id, name: user.name, email: user.email, biography: user.biography, logo: user.logo, isPublicEmail: user.isPublicEmail, isAdmin: user.isAdmin, createdAt: user.createdAt });
    } catch (error) {
        console.log(error);
        errorHandling(next, serverError);
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
        return res.redirect('https://function.divlo.fr');
    } catch (error) {
        console.log(error);
        errorHandling(next, serverError);
    }
}