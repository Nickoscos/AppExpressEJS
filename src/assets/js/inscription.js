const EventEmitter = require('events');

let profil = {
    nom : "",
    prenom : "",
    dateNaissance : new Date,
    email : "",
    password : "",
    telephone : 0,
    adresse : "",
    ville : "",
    codePostal : 0
}

// Fonction qui récupère les données saisies lors de l'inscription
function validationProfil(data) {
    //Récupération des paramètres URL
    let paramsString = String(data) //transforme les data URL en string pour la class URLSearchParams
    let searchParams = new URLSearchParams(paramsString); //Déclare la classe searchParams qui contient les input du formulaire


    profil.nom = searchParams.get("nom");
    console.log(profil.nom);
}

module.exports = { validationProfil };