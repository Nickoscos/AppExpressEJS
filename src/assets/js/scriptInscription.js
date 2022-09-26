import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io("ws://localhost:3331");

socket.on("actuInscr", (Message, profil) => {
    document.getElementById("spanNom").innerHTML = Message.nom;
    document.getElementById("spanPrenom").innerHTML = Message.prenom;
    document.getElementById("spanDate").innerHTML = Message.dateNaissance;
    document.getElementById("spanEmail").innerHTML = Message.email;
    document.getElementById("spanPassword").innerHTML = Message.password;
    document.getElementById("spanPhone").innerHTML = Message.telephone;
    console.log(profil);
    document.getElementById("nom").value = profil.nom;
    document.getElementById("prenom").value = profil.prenom;
    document.getElementById("date").value = profil.dateNaissance;
    document.getElementById("email").value = profil.email;
    document.getElementById("password").value = profil.password;
    document.getElementById("confirmPassword").value = profil.confirmPassword;
    document.getElementById("phone").value = profil.telephone;
    document.getElementById("adresse").value = profil.adresse;
    document.getElementById("ville").value = profil.ville;
    document.getElementById("codePostal").value = profil.codePostal;

})