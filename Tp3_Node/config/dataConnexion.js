const mongo = require('mongoose');
const connect = async () => {
    try {
        const DATA_URL = 'mongodb+srv://ak:438462@tp2.6juqutv.mongodb.net/?retryWrites=true&w=majority';
        await mongo.connect(DATA_URL);
        console.log(`Bien connect a la Base de donne !!!!!!! url suivant : ${DATA_URL}`)
    } catch (error) {
        console.log(`Eureur de la connection de la Base , Error est : ${error}`)
    }
}
module.exports = connect;