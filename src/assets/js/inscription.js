const EventEmitter = require('events');
const event = new EventEmitter;

var passwordValidator = require('password-validator');

let profil = {
    nom : "",
    prenom : "",
    dateNaissance : new Date,
    email : "",
    password : "",
    confirmPassword : "",
    telephone : 0,
    adresse : "",
    ville : "",
    codePostal : 0,
    valid: false
}

let Message = {
    nom : "",
    prenom : "",
    dateNaissance : "",
    email : "",
    password : "",
    confirmPassword : "",
    telephone : "",
    adresse : "",
    ville : "",
    codePostal : ""
}

// Fonction qui récupère les données saisies lors de l'inscription
function validationProfil(data) {
    //Récupération des paramètres URL
    let paramsString = String(data) //transforme les data URL en string pour la class URLSearchParams
    let searchParams = new URLSearchParams(paramsString); //Déclare la classe searchParams qui contient les input du formulaire
    console.log(data)
    //Récupération des données saisies
    // profil.nom = searchParams.get("nom");
    // profil.prenom = searchParams.get("prenom");
    // profil.dateNaissance = searchParams.get("date");
    // profil.email = searchParams.get("email");
    // profil.password = searchParams.get("password");
    // profil.confirmPassword = searchParams.get("confirmPassword");
    // profil.telephone = searchParams.get("phone");
    // profil.adresse = searchParams.get("adresse");
    // profil.ville = searchParams.get("ville");
    // profil.codePostal = searchParams.get("codePostal");
    // event.emit('validNom', validNom(profil.nom)) //Génération de l'évènement permettant la validation du nom
    
}

function validNom(nom) {
    if (nom.length < 2) {
        Message.nom = "Veuillez saisir un nom comprenant 2 caractères minimum"
    } else {
        Message.nom = ""
    }

    event.emit('validPrenom', validPrenom(profil.prenom))
}

function validPrenom(prenom){
    if (prenom.length < 2) {
        Message.prenom = "Veuillez saisir un prenom comprenant 2 caractères minimum"
    } else {
        Message.prenom = ""
    }

    event.emit('validDateNaissance', validDate(profil.dateNaissance))
}

function validDate(date){
    console.log(date.length)
    if (date.length == 0) {
        Message.dateNaissance = "Veuillez saisir une date"
    } else {
        Message.dateNaissance = ""
    }

    event.emit('validEmail', validEmail(profil.email))
}

function validEmail(email){
    const mail = String(email)
    if (!mail.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)) {
        Message.email = "Veuillez saisir une adresse mail"
    } else {
        Message.email = ""
    }
    event.emit('validPassword', validPassword(profil.password, profil.confirmPassword))
}

function validPassword(PWD, confirmPassword){
    const password = String(PWD)

    var schema = new passwordValidator();

    if (!schema.is().min(6).validate(password)) {
        Message.password = "Veuillez saisir un mot de passe comprenant 6 caractères minimum"
    } else if (!schema.has().digits(1).validate(password)) {
        Message.password = "Votre mot de passe doit avoir 1 chiffre au minimum";
    } else if (password !== String(confirmPassword) ) {
        Message.password = "Veuillez saisir des mots de passe identiques";
    } else {
        Message.password = ""
    }
    event.emit('validPhone', validPhone(profil.telephone))
}

function validPhone(telephone){
    const phone = String(telephone)
    if (phone.length !== 10) {
        Message.telephone = "Veuillez saisir un numéro de téléphone à 10 chiffres"
    } else {
        Message.telephone = ""
    }
    event.emit('validProfil', validProfil());
}

function validProfil(){
    profil.valid = (Message.nom === "" ) && (Message.prenom === "" ) 
                    && (Message.dateNaissance === "" ) && (Message.email === "" ) 
                    && (Message.password === "" ) && (Message.telephone === "" );
    if (profil.valid) {
        console.log("Inscription ok")
    } else {
        console.log("Inscription non ok")
    }
    console.log(profil)
    return Message, profil
}

module.exports = { validationProfil, profil, Message };