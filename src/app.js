console.log("Lancement de l'application");

require('./config/.env');


//Création du serveur local
let http = require('http');
let fs = require('fs');
let path = require('path');

let taux = [];

//Chemin du fichier contenant les taux de devise
let pathFile = 'src/assets/json/taux.json';

//Fonction de lecture JSON STREAM READABLE
function streamReadFile(pathF){
    const stream = fs.createReadStream(pathF); //Lecture du contenu du JSON
    stream.setEncoding('utf8'); //On encode pour ne pas avoir les octets bruts
    stream.on("data", (data)=> {
        taux = JSON.parse(data); //On range le contenu dans taux
        console.log(taux);
    });
}

//Création du serveur HTTP
let server = http.createServer((request, response) => {
   
    let url = request.url;
    let extname = path.extname(url);
    if(url === '/'){
        fs.readFile(_dirnamePages + 'pages/accueil.html', null, function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    }
    else if (url === '/IMC.js'){
        response.writeHead(200);
        fs.readFile(path.join(_dirnamePages + 'IMC.js'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/javascript' });
            response.write(data);
            response.end();
        });
    }
    else if (url === '/convertisseurDevise.js'){
        response.writeHead(200);
        fs.readFile(path.join(_dirnamePages + 'convertisseurDevise.js'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/javascript' });
            response.write(data);
            response.end();
        });
        streamReadFile(pathFile);
        // const stream = fs.createReadStream(pathFile);
        // stream.setEncoding('utf8');
        // stream.on("data", (data)=> console.log(data));
    }
    else if(url === '/calculImc'){
        response.writeHead(200);
        fs.readFile(path.join(_dirnamePages + 'pages/calculImc.html'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    }
    else if(url === '/convDevise'){
        response.writeHead(200);
        fs.readFile(path.join(_dirnamePages + 'pages/convDevise.html'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    }
    else if(extname === '.png'){
        response.writeHead(200, { 'Content-Type': 'image/png' });
        fs.createReadStream(`${_dirnamePages}${url}`).pipe(response);
    }
    else if(extname === '.css'){
        response.writeHead(200, { 'Content-Type': 'text/css' });
        fs.createReadStream(`${_dirnamePages}${url}`).pipe(response);
    }
});

//Choix du port pour le serveur local
server.listen(3331);



