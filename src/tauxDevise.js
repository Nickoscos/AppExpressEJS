const EventEmitter = require('events');
let fs = require('fs');
const event = new EventEmitter;

let taux = [
    { devise1: 'USD', devise2: 'EUR', taux: 1 },
    { devise1: 'USD', devise2: 'CNY', taux: 6.97 },
    { devise1: 'CNY', devise2: 'EUR', taux: 0.14 }];

let montantsSaisie = {
    EURO : 0,
    USD: 0,
    CNY: 0
}
/****************************************************** */
/* Récupération des taux de devise et appel conversion  */
/****************************************************** */
function change (pathFile, data) {
    taux.splice(0, taux.length);
    const stream = fs.createReadStream(pathFile); //Lecture du contenu du JSON
    stream.setEncoding('utf8'); //On encode pour ne pas avoir les octets bruts
    stream.on("data", (data)=> {
        taux= (JSON.parse(data)); //On range le contenu dans taux
        console.log(taux);
    }).on('end', ()=>{
        event.emit('change', changeDevise(data, taux)); //Génération de l'évènement permettant la conversion de la devise
    })
    
}
/******************************************************* */
/*               Fonction de change devise               */
/******************************************************* */
function changeDevise(data, tauxlus){
    //Récupération des paramètres URL
    let paramsString = String(data) //transforme les data URL en string pour la class URLSearchParams
    let searchParams = new URLSearchParams(paramsString); //Déclare la classe searchParams qui contient les input du formulaire

    //Rangement des paramètres soumis dans le formulaire
    let MontantEUR = Number(searchParams.get("montantEUR"));
    let MontantUSD = Number(searchParams.get("montantUSD"));
    let MontantCNY = Number(searchParams.get("montantCNY"));

    //Détection de la devise modifiée
    if (MontantEUR !== montantsSaisie.EURO ) {
        console.log("Montant EURO changé");
        montantsSaisie.EURO = Math.round(MontantEUR*100)/100;
        montantsSaisie.USD = Math.round(MontantEUR/taux[0].taux*100)/100;
        montantsSaisie.CNY = Math.round(MontantEUR/taux[2].taux*100)/100;   
    } else if (MontantUSD !== montantsSaisie.USD ) {
        montantsSaisie.EURO = Math.round(MontantUSD*taux[0].taux*100)/100;
        montantsSaisie.USD = Math.round(MontantUSD*100)/100;
        montantsSaisie.CNY = Math.round(MontantUSD*taux[1].taux*100)/100;   
    } else if (MontantCNY !== montantsSaisie.CNY ) {
        console.log("Montant CNY changé");
        montantsSaisie.EURO = Math.round(MontantCNY/taux[2].taux*100)/100;
        montantsSaisie.USD = Math.round(MontantCNY/taux[1].taux*100)/100;
        montantsSaisie.CNY = Math.round(MontantCNY*100)/100;
    }

    //Retourne les montant dans le formulaire
    searchParams.set("montantEUR", montantsSaisie.EURO);
    searchParams.set("montantUSD", montantsSaisie.EURO);
    searchParams.set("montantCNY", montantsSaisie.CNY);
    
    newdata = searchParams.toString();

    return montantsSaisie;
}

module.exports = {changeDevise, change, taux, montantsSaisie};
