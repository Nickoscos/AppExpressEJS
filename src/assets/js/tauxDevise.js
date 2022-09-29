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
function change (pathFile, session, req, res) {
    taux.splice(0, taux.length);
    const stream = fs.createReadStream(pathFile); //Lecture du contenu du JSON
    stream.setEncoding('utf8'); //On encode pour ne pas avoir les octets bruts
    stream.on("data", (data)=> {
        taux= (JSON.parse(data)); //On range le contenu dans taux
        console.log(taux);
    }).on('end', ()=>{
        event.emit('change', changeDevise(taux, session, req, res)); //Génération de l'évènement permettant la conversion de la devise
    })
    
}
/******************************************************* */
/*               Fonction de change devise               */
/******************************************************* */
function changeDevise(tauxlus, session, req, res){

    //Rangement des paramètres soumis dans le formulaire

    let MontantEUR = Number(req.body.montantEUR);
    let MontantUSD = Number(req.body.montantUSD);
    let MontantCNY = Number(req.body.montantCNY);

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
    req.body.montantEUR = montantsSaisie.EURO;
    req.body.montantUSD = montantsSaisie.EURO;
    req.body.montantCNY = montantsSaisie.CNY;
    
    res.render('convDevise', {
        session: session,
        montantEUR: montantsSaisie.EURO,
        montantUSD: montantsSaisie.USD,
        montantCNY: montantsSaisie.CNY
    });

    return montantsSaisie;
}

module.exports = {changeDevise, change, taux, montantsSaisie};
