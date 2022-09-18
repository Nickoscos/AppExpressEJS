import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io("ws://localhost:3331");

//Le socket est à l'écoute des évènements venant du serveur
socket.on("actuIMC", (userIMC) => {
    console.log(nom)
    document.getElementById("nom").value = userIMC.nom;
    document.getElementById("tailleCm").value = userIMC.tailleCm;
    document.getElementById("poidsKg").value = userIMC.poidsKg;

    if (userIMC.nom !== "" && userIMC.resultat>0 && userIMC.resultat<50) {
        document.getElementById("utilisateur").innerHTML = "Bonjour " + userIMC.nom;
        document.getElementById("resultatIMC").innerHTML = "Votre IMC est de " + userIMC.resultat;
    }
    
})