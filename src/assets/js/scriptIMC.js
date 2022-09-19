import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io("ws://localhost:3331");

//Le socket est à l'écoute des évènements venant du serveur
socket.on("actuIMC", (userIMC) => {
    console.log(nom)
    document.getElementById("nom").value = userIMC.nom;
    document.getElementById("tailleCm").value = userIMC.tailleCm;
    document.getElementById("poidsKg").value = userIMC.poidsKg;

    afficherResultat(userIMC);
    
})

function afficherResultat(userIMC) {

    //Affichage du résultat
    if (userIMC.nom !== "" && userIMC.resultat>0 && userIMC.resultat<50) {
        document.getElementById("utilisateur").innerHTML = "Bonjour " + userIMC.nom;
        document.getElementById("resultatIMC").innerHTML = "Votre IMC est de " + userIMC.resultat;
    }

    //Affichage de la corpulence
    let html_img = document.getElementById("resultatIMG");

    if (userIMC.resultat>0 && userIMC.resultat < 18.5) {
        document.getElementById("resultatCORP").innerHTML = "Vous êtes maigre";
        html_img.setAttribute("src","/img/maigre.png");
    } else if (userIMC.resultat >=18.5 && userIMC.resultat<25) {
        document.getElementById("resultatCORP").innerHTML = "Vous avez une corpulence normale";
        html_img.setAttribute("src","/img/notmal.png");
    } else if (userIMC.resultat >=25 && userIMC.resultat<30) {
        document.getElementById("resultatCORP").innerHTML = "Vous êtes en surpoids";
        html_img.setAttribute("src","/img/gros.png");
    } else if (userIMC.resultat >=30) {
        document.getElementById("resultatCORP").innerHTML = "Vous êtes obèse"; 
        html_img.setAttribute("src","/img/obese.png");
    }
    
}