console.log("Lancement de l'application");

//Appel du module accueil
//const accueil = require('./accueil');

//Appel du module calculImc
require('./calculImc');

//Appel du module convertisseurDevise
require('./convertisseurDevise');

//Création du serveur local
let http = require('http');
let fs = require('fs');

let server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    let url = request.url;
    if(url === '/'){
        fs.readFile('./src/pages/accueil.html', null, function (error, data) {
            if (error) {
                throw error;
            } else {
                response.write(data);
            }
            response.end();
        });
    }
    else if(url === '/calculImc'){
        fs.readFile('./src/pages/calculImc.html', null, function (error, data) {
            if (error) {
                throw error;
            } else {
                response.write(data);
            }
            response.end();
        });
    }

});

//Choix du port pour le serveur local
server.listen(3331);



