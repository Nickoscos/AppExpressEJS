console.log("calcul de l'IMC");

//vérifie que le document soit prêt
let stateCheck = setInterval(() => 
{
    if(document.readyState ==='complete')       // attendre que le document soit COMPLET
    {
        document.querySelector('#IMCForm').addEventListener('submit', CalculIMC);
        clearInterval(stateCheck);
    }
}, 100);



function CalculIMC() {

    let nom = document.getElementById("nom");
    let tailleCm = document.getElementById("tailleCm");
    let poidsKg = document.getElementById("poidsKg");

    let resultat = poidsKg.value*100/(tailleCm.value);
    console.log(resultat);
    
}