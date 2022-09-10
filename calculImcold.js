var EventEmitter = require('events');


//Création de l'évènment calcul IMC
var calculImcEvent = new EventEmitter();


//Listener
var calculListener = function calcul(taille, poids, resultat){
    resultat = poids*100/(taille);
    console.log(resultat);
    console.log("test")
}

//CALCUL DE L'IMC
calculImcEvent.addListener('click', calculListener);

var resultatIMC = 0;

calculImcEvent.emit('click', 170, 82, resultatIMC);


console.log(resultatIMC);
