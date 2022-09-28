const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nom: { type: String, required: 'Entrer un nom'},
    prenom: { type: String, required: 'Entrer un prenom'},
    dateNaissance: { type: Date },
    email: { type: String, required: 'Entrer un email'},
    password: { type: String, required: 'Entrer un mot de passe'},
    telephone: { type: String },
    adresse: { type: String },
    ville: { type: String },
    codePostal: { type: String },
    created_date: { type: Date, default: Date.now },
})

module.exports = { UserSchema }