
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io("ws://localhost:3331");

//Le socket est à l'écoute des évènements venant du serveur
socket.on("actuValue", (montants) => {
    document.getElementById("montantEUR").value = montants.EURO;
    document.getElementById("montantUSD").value = montants.USD;
    document.getElementById("montantCNY").value = montants.CNY;
})