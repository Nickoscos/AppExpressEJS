console.log("Lancement de l'application");

require('./config/.env');


const tauxFct = require('./tauxDevise.js');
//const DeviseFct = require('./convertisseurDevise.js');

//Création du serveur local
let http = require('http');
let fs = require('fs');
let path = require('path');
const { Server } = require("socket.io");

let montants = [];

//Chemin du fichier contenant les taux de devise
let pathFile = 'src/assets/json/taux.json';


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
    // else if (url === '/socket.io.js'){
    //     response.writeHead(200);
    //     fs.readFile(path.join('/node_modules/socket.io/client-dist/socket.io.js'), function (error, data) {
    //         response.writeHead(200, { 'Content-Type': 'text/javascript' });
    //         response.write(data);
    //         response.end();
    //     });
    // }
    else if (url === '/IMC.js'){
        response.writeHead(200);
        fs.readFile(path.join(_dirnamePages + 'IMC.js'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/javascript' });
            response.write(data);
            response.end();
        });
    }
    else if (url === '/scriptDevise.js'){
        response.writeHead(200);
        // fs.readFile(path.join(_dirnamePages + 'tauxDevise.js'), function (error, data) {
        //     response.writeHead(200, { 'Content-Type': 'text/javascript' });
        //     response.write(data);
        //     response.end();
        // });
        fs.readFile(path.join(_dirnamePages + 'scriptDevise.js'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/javascript' });
            response.write(data);
            response.end();
        });
        // tauxFct.streamReadFile(pathFile);
        // console.log(tauxFct.taux);
    }
    else if(url === '/calculImc'){
        response.writeHead(200);
        fs.readFile(path.join(_dirnamePages + 'pages/calculImc.html'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    }
    else if((url === '/convDevise')){
        response.writeHead(200);
        fs.readFile(path.join(_dirnamePages + 'pages/convDevise.html'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
        //Détection envoi formulaire
        if(request.method == 'POST') {
            request.on('data',  (data) => { 
                tauxFct.change(pathFile, data);
            });

            // request.on('data',  () => { 
            //     taux = tauxFct.streamReadFile(pathFile);
            // }).on('end',  (data) => {
            //     montants = tauxFct.changeDevise(data, taux)
            // }
                
            //)
            // request.on('data',  (data) => { 
            //     montants = tauxFct.changeDevise(data, pathFile); 
            // });

        }
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

const io = new Server(server);
io.on('connection', socket => {
    console.log(`connect ${socket.id}`);
  
    socket.emit('actuValue', tauxFct.montantsSaisie);
});

//Choix du port pour le serveur local
server.listen(3331);



