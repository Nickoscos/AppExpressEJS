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

const ImcSchema = new Schema({
    nom: { type: String },
    tailleCm: { type: Number },
    poidsKg: { type: Number },
    resultat: { type: Number },
    created_date: { type: Date, default: Date.now },
})

const DevisesSchema = new Schema({
    montantEUR: { type: Number },
    montantUSD: { type: Number },
    montantCNY: { type: Number },
    created_date: { type: Date, default: Date.now },
})

const PostSchema = new Schema({
    titre : { type: String },
    content: { type: String },
    loveit: { type: Number },
    created_date: { type: Date, default: Date.now },
})

module.exports = { UserSchema, ImcSchema, DevisesSchema, PostSchema }