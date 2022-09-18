const EventEmitter = require('events');
let fs = require('fs');
const event = new EventEmitter;

let userIMC = {
    nom : "",
    tailleCm : 0,
    poidsKg : 0,
    resultat: 0
}


// Fonction qui récupère les données saisies pour calculer l'IMC
function Calcul(data) {
    //Récupération des paramètres URL
    let paramsString = String(data) //transforme les data URL en string pour la class URLSearchParams
    let searchParams = new URLSearchParams(paramsString); //Déclare la classe searchParams qui contient les input du formulaire


    userIMC.nom = searchParams.get("nom");
    userIMC.tailleCm = searchParams.get("tailleCm");
    userIMC.poidsKg = searchParams.get("poidsKg");

    let tailleM = userIMC.tailleCm/100;
    console.log(userIMC.poidsKg/(tailleM*tailleM))
    userIMC.resultat = Math.round((userIMC.poidsKg/(tailleM*tailleM))*100)/100;

    console.log("IMC: " + userIMC.resultat);

    //Retourne les montant dans le formulaire
    searchParams.set("nom", userIMC.nom);
    searchParams.set("tailleCm", userIMC.tailleCm);
    searchParams.set("poidsKg", userIMC.poidsKg);
    
    data = searchParams.toString();

    return userIMC;

}

module.exports = { Calcul, userIMC };