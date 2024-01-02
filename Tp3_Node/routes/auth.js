const express = require('express');
//Importons tous les fonction don on a besoin
const {
    postLogin,
    postRegistre,
    postRegistreValidateEmail } = require('../controllers/auth');
// je ne recupere aucun information sur Params donc on pas besoin

const router = express.Router();
// /auth/login
// /auth/register
// /auth/register/validate-email
router.route('/login').post(postLogin)
router.route('/register').post(postRegistre)
router.route('/register/validate-email').post(postRegistreValidateEmail)
module.exports = router;