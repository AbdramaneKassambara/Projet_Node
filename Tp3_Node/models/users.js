const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const jwb = require('jsonwebtoken');
const users = new mongoose.Schema({
    email: {
        type: String,

    },
    password: {
        type: String,
        require: [true, 'title is required ']
    },
    firstName: {
        type: String,
        require: [true, 'title is required ']
    },
    lastName: {
        type: String,
        require: [true, 'title is required ']
    },
    wins: {
        type: Number,
        default: 0
    },
    losts: {
        type: Number,
        default: 0
    }
});
//bcryptjs le mot de passe ici avec une function pre veut dire une methode qu'on avant dans la base de donne (save tout post creer est save dans une database)
users.pre('save', async function () {
    const sal = await bcrypt.genSalt(10);
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, sal);
    console.log(this.password);
});
//on appelle cette fonction comme function primitive sans (=>)
users.methods.isMacthPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('Utilisateurs', users);