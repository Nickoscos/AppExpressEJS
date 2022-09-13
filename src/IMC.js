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


// Fonction qui récupère les données saisies pour calculer l'IMC
function CalculIMC() {

    let nom = document.getElementById("nom");
    let tailleCm = document.getElementById("tailleCm");
    let poidsKg = document.getElementById("poidsKg");

    let tailleM = tailleCm.value/100;
    console.log(poidsKg.value/(tailleM*tailleM))
    let resultat = Math.round((poidsKg.value/(tailleM*tailleM))*100)/100;
    
    afficherIMC(nom, resultat)
}

//Retourne le résultat vers la page HTML
function afficherIMC(nom, IMC) {
    let html_div_nom = document.getElementById("utilisateur");
    let html_div_IMC = document.getElementById("resultatIMC");
    let html_div_CORP = document.getElementById("resultatCORP");
    let html_div_IMG = document.getElementById("resultatIMG");

    let html_span = document.getElementById("departMessage");

    html_span.hidden = true;
    
    if( IMC > 0 && IMC < 100 ){
        html_div_nom.innerHTML = String('Bonjour ' + nom.value + ',');
        html_div_IMC.innerHTML = String('Votre IMC est de : ' + IMC);
    } else {
        html_div_nom.innerHTML = '';
        html_div_IMC.innerHTML = 'Veuillez saisir une taille et un poids corrects'
    }

    if( IMC < 18.5 ){
        html_div_CORP.innerHTML  = 'Vous êtes maigre'; //Affichage du texte
        html_div_IMG.setAttribute('src', 'assets/img/maigre.png'); //Changement de l'image source
        
    } else if ( IMC >= 18.5 && IMC < 25 ) {
        html_div_CORP.innerHTML  = 'Vous êtes normal';
        html_div_IMG.setAttribute('src', 'assets/img/normal.png');
    } else if ( IMC >= 25 && IMC < 35 ) {
        html_div_CORP.innerHTML  = 'Vous êtes en surpoids';
        html_div_IMG.setAttribute('src', 'assets/img/gros.png');
    } else if ( IMC >= 35 ) {
        html_div_CORP.innerHTML  = 'Vous êtes obèse';
        html_div_IMG.setAttribute('src', 'assets/img/obese.png');
    } else {
        html_div_CORP.innerHTML  = '';
        html_div_IMG.setAttribute('src', '');
    }
}