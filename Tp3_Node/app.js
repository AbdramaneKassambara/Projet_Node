const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const databases = require('./config/dataConnexion');
const routerauth = require('./routes/auth');
const routergame = require('./routes/game');
const routeruser = require('./routes/users');
app.use(express.json());
app.use('/auth', routerauth);
app.use('/game', routergame);
app.use('/users', routeruser);
app.get('/', (req, res) => {

    res.send('initial point');
})

databases();
app.listen(process.env.PORT, () => { console.log(`le port ecoouter sur le : ${process.env.PORT} !!!`) });