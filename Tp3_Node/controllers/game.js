const game = require('../models/users');
exports.postGameWin = async (req, res) => {
    const { meid } = req;
    const filters = { '_id': meid }
    const use = await game.findOne(filters)
    if (!use) {
        return res.send({ 'success': 'false', 'msg': 'informations invalid' })
    }
    let inc = use.wins;
    inc += 1;
    const win = { 'wins': inc }
    await game.updateOne(filters, win);
    res.send({ 'success': 'true' })
}



exports.postGameLost = async (req, res) => {
    const { meid } = req;
    const filters = { '_id': meid }
    const use = await game.findOne(filters)
    if (!use) {
        return res.send({ 'success': 'false', 'msg': 'informations invalid' })
    }
    let dcrem = use.losts;
    dcrem += 1;
    const losts = { 'losts': dcrem }
    await game.updateOne(filters, losts);
    res.send({ 'success': 'true' })
}
