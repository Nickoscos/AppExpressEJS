const EventEmitter = require('events');
let fs = require('fs');
const event = new EventEmitter;

let userIMC = {
    nom : "",
    tailleCm : 0,
    poidsKg : 0,
    IMC: 0,
    resultatIMC: "",
    resultatUser: "",
    resultatCORP: "",
    image: ""
}


// Fonction qui récupère les données saisies pour calculer l'IMC
function Calcul(data) {

    userIMC.nom = data.nom;
    userIMC.tailleCm = data.tailleCm;
    userIMC.poidsKg = data.poidsKg;

    let tailleM = userIMC.tailleCm/100;
    console.log(userIMC.poidsKg/(tailleM*tailleM))
    userIMC.IMC = Math.round((userIMC.poidsKg/(tailleM*tailleM))*100)/100;

    console.log("IMC: " + userIMC.IMC);

    //Retourne les montant dans le formulaire
    data.nom = userIMC.nom;
    data.tailleCm = userIMC.tailleCm;
    data.poidsKg = userIMC.poidsKg;

    //Affichage du résultat
    if (userIMC.nom !== "" && userIMC.IMC>0 && userIMC.IMC<50) {
        userIMC.resultatUser = "Bonjour " + userIMC.nom;
        userIMC.resultatIMC = "Votre IMC est de " + userIMC.IMC;

        if (userIMC.IMC>0 && userIMC.IMC < 18.5) {
            userIMC.resultatCORP = "Vous êtes maigre";
            userIMC.image = "/img/maigre.png";
        } else if (userIMC.IMC >=18.5 && userIMC.IMC<25) {
            userIMC.resultatCORP = "Vous avez une corpulence normale";
            userIMC.image = "/img/normal.png";
        } else if (userIMC.IMC >=25 && userIMC.IMC<30) {
            userIMC.resultatCORP = "Vous êtes en surpoids";
            userIMC.image = "/img/gros.png";
        } else if (userIMC.IMC >=30) {
            userIMC.resultatCORP = "Vous êtes obèse"; 
            userIMC.image = "/img/obese.png";
        }
    }

    return userIMC;

}

module.exports = { Calcul, userIMC };