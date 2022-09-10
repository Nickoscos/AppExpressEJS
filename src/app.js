console.log("Lancement de l'application");
console.log("Lancement de l'application");
require('./config/.env');

//Appel du module convertisseurDevise
require('./convertisseurDevise');

//Création du serveur local
let http = require('http');
let fs = require('fs');
let path = require('path');


let server = http.createServer((request, response) => {
   
    let url = request.url;
    if(url === '/'){
        fs.readFile(_dirnamePages + 'pages/accueil.html', null, function (error, data) {
            response.writeHead(200);
            response.write(data, "binary");
            response.end();
        });
    }
    else if (url === '/IMC.js'){
        response.writeHead(200);
        fs.readFile(path.join(_dirnamePages + 'IMC.js'), function (error, data) {
            response.write(data, "binary");
            response.end();
        });
    }
    else if(url === '/calculImc'){
        response.writeHead(200);
        fs.readFile(path.join(_dirnamePages + 'pages/calculImc.html'), function (error, data) {
            response.write(data, "binary");
            response.end();
        });
    }

});

//Choix du port pour le serveur local
server.listen(3331);



