document.querySelector('#btn').addEventListener('submit', CalculIMC);

console.log("Lancement de l'application");

function CalculIMC() {
    let nom = document.getElementById("nom");
    let tailleCm = document.getElementById("tailleCm");
    let poidsKg = document.getElementById("tailleKg");

    let resultat = poidsKg*100/(tailleCm);
    
}