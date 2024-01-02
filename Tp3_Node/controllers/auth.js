const auth = require('../models/users');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const filters = { 'email': email };
    // verification Email
    const authentification = await auth.findOne(filters);
    if (!authentification) {
        return res.send({ 'success': 'false', 'msg': 'informations invalid' })
    }
    //compare le Mot2passe
    const passwordComp = await authentification.isMacthPassword(password);
    if (!passwordComp) {
        return res.send({ 'success': 'false', 'msg': 'informations invalid' })
    }
    const token = jwt.sign(
        { id: authentification._id },
        process.env.JWT_SECRE_KEY,
        { expiresIn: process.env.JUST_EXPIRE })
    res.send({ 'Success ': 'true', 'token': token })
}
let confirmationCode = 0;
const envoieCouriel = async (courriel) => {
    try {

        // le transporteur pour envoie les courriel 
        const transporteur = nodemailer.createTransport({
            // host d'abord c'est quel type de qu'on veut envoie 
            // si c'est email  host: "smtp.ethereal.email",
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                // compte principale de qui envoie 
                user: "dicko_223@hotmail.com",
                pass: "kassambara"
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        // les information d'envoie 
        confirmationCode = Math.floor(Math.random() * 900000) + 100000;
        const info = await transporteur.sendMail({
            from: '"SKC" <papou_tp3@hotmail.com>', // sender address
            //abdramanekassambara@teccart.online
            to: `${courriel}`, // list of receivers
            subject: " Confirmation de code  ", // Subject line
            html: `<b style="color:green">Votre Code de Confirmation est : ${confirmationCode}</b>`, // html body
        });
        console.log(`Message bien evoyer voici l'id du Message :${info.messageId}`);
    } catch (error) {
        console.log(`Erreur d'envoie : ${error}`);
    }

};
const userTemp = [];
exports.postRegistre = async (req, res) => {
    const { email, password, firstName, lastName, } = req.body;
    const emails = await auth.findOne({ 'email': email });
    if (emails !== null) return res.send({ "sucess ": false, "msg": "information invalide Email exit" });
    envoieCouriel(email);
    userTemp.push({
        "email": email,
        "password": password,
        "confirmationCode": confirmationCode,
        "firstName": firstName,
        "lastName": lastName
    });
    console.log(userTemp);
    res.send({ 'success': 'true' })
}
const verifieEmailCode = (coureil, code) => {
    for (let i = 0; i < userTemp.length; i++) {
        const element = userTemp[i];
        if (!element.email == coureil && !element.confirmationCode == code) {
            return false;
        }
        return true;
    }
}
exports.postRegistreValidateEmail = async (req, res) => {
    const { email, code } = req.body;
    if (verifieEmailCode(email, code) == false) {
        return res.send("informations invalid")
    }
    const autentification = await auth.create(userTemp);
    const token = jwt.sign(
        { id: autentification._id },
        process.env.JWT_SECRE_KEY,
        { expiresIn: process.env.JUST_EXPIRE })
    res.send({ 'Success ': 'true', 'token': token })
}