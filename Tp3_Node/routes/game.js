const express = require('express');
//Importons tous les fonction don on a besoin
const {
    postGameWin,
    postGameLost } = require('../controllers/game');
// je ne recupere aucun information sur Params donc on pas besoin
const router = express.Router();
const { private } = require('../middlewares/auth');
// POST /game/win
// POST /game/lost
router.route('/win').post(private, postGameWin)
router.route('/lost').post(private, postGameLost)
module.exports = router;