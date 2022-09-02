console.log("Lancement de l'application");

//Appel du module accueil
const accueil = require('./accueil');

//Appel du module calculImc
require('./calculImc');

//Appel du module convertisseurDevise
require('./convertisseurDevise');

//Création du serveur local
var http = require('http');
var server = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(accueil.presentation);
});

//Choix du port pour le serveur local
server.listen(3331);



