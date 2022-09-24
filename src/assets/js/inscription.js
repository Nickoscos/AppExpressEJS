const EventEmitter = require('events');
const event = new EventEmitter;

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
    codePostal : 0
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

    //Récupération des données saisies
    profil.nom = searchParams.get("nom");
    profil.prenom = searchParams.get("prenom");
    profil.dateNaissance = searchParams.get("date");
    profil.email = searchParams.get("email");
    profil.password = searchParams.get("password");
    profil.confirmPassword = searchParams.get("confirmPassword");
    profil.telephone = searchParams.get("phone");
    profil.adresse = searchParams.get("adresse");
    profil.ville = searchParams.get("ville");

    console.log(profil);

    event.emit('validNom', validNom(profil.nom)) //Génération de l'évènement permettant la validation du nom
    
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
    if (typeof(date) == Date) {
        Message.date = "Veuillez saisir une date"
    } else {
        Message.date = ""
    }

    event.emit('validEmail', validEmail(profil.email))
}

function validEmail(email){
    const mail = String(email)
    console.log(email)
    if (!mail.search('@')) {
        Message.email = "Veuillez saisir une adresse mail"
    } else {
        Message.email = ""
    }
    console.log(Message)
    //event.emit('validDateNaissance', validEmail(profil.email))
}


module.exports = { validationProfil };