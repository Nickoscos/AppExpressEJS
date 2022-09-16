let montantsSaisie = {
    EURO : 0,
    USD: 0,
    CNY: 0
}

function changeDevise(data){
    //Récupération des paramètres URL
    let paramsString = String(data) //transforme les data URL en string pour la class URLSearchParams
    let searchParams = new URLSearchParams(paramsString); //Déclare la classe searchParams qui contient les input du formulaire

    //Rangement des paramètres lus
    let MontantEUR = searchParams.get("montantEUR");
    let MontantUSD = searchParams.get("montantUSD");
    let MontantCNY = searchParams.get("montantCNY");


    montantsSaisie.EURO = MontantEUR;
    montantsSaisie.USD = MontantUSD;
    montantsSaisie.CNY = MontantCNY;
//     console.log("Montant EURO " + montantsSaisie.EURO);
//     console.log("Montant USD " + montantsSaisie.USD);
//     console.log("Montant CNY " + montantsSaisie.CNY);
}

module.exports = { changeDevise };