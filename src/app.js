console.log("Lancement de l'application");

require('./config/.env');


const tauxFct = require('./assets/js/tauxDevise.js');
const imcFct = require('./assets/js/calculIMC.js');

const { check, validationResult }
    = require('express-validator');
const bodyparser = require('body-parser')

//Création du serveur local
const express = require('express')
const app = express()
const port = 3331

let http = require('http');
let fs = require('fs');
let path = require('path');
const { Server } = require("socket.io");

//Chemin du fichier contenant les taux de devise
let pathFile = 'src/assets/json/taux.json';



//Routage vers page accueil
app.get('/', (request, response) => {
    fs.readFile(_dirnamePages + 'pages/accueil.html', null, function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
})

//Routage vers page calcul IMC
app.get('/calculImc', (request, response) => {
        fs.readFile(path.join(_dirnamePages + 'pages/calculImc.html'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
})

//Routage POST page calcul IMC
app.post('/calculImc', (request, response) => {
    request.on('data',  (data) => { 
        imcFct.Calcul(data);
    });
    fs.readFile(path.join(_dirnamePages + 'pages/calculImc.html'), function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
})

//Routage vers page convertisseur devise
app.get('/convDevise', (request, response) => {
    fs.readFile(path.join(_dirnamePages + 'pages/convDevise.html'), function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
})

//Routage POST page convertisseur devise
app.post('/convDevise', (request, response) => {
    request.on('data',  (data) => { 
        tauxFct.change(pathFile, data);
    });
    fs.readFile(path.join(_dirnamePages + 'pages/convDevise.html'), function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
})

//Routage POST page inscription
app.post('/inscription', 
    body('email').custom(value => {
        return User.findUserByEmail(value).then(user => {
        if (user) {
            return Promise.reject('E-mail already in use');
        }
        });
    }),
    (request, response) => {
        fs.readFile(path.join(_dirnamePages + 'pages/inscription.html'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
    });
})

//Routage vers les fichiers CSS 
app.use(express.static(_dirnamePages + '/assets'));

//Création du serveur HTTP
const server = http.createServer(app);
// let server = http.createServer((request, response) => {
   
//     let url = request.url;
//     let extname = path.extname(url);
//     if(url === '/'){
//         fs.readFile(_dirnamePages + 'pages/accueil.html', null, function (error, data) {
//             response.writeHead(200, { 'Content-Type': 'text/html' });
//             response.write(data);
//             response.end();
//         });
//     }
//     else if (url === '/IMC.js'){
//         response.writeHead(200);
//         fs.readFile(path.join(_dirnamePages + 'IMC.js'), function (error, data) {
//             response.writeHead(200, { 'Content-Type': 'text/javascript' });
//             response.write(data);
//             response.end();
//         });
//     }
//     else if (url === '/scriptDevise.js'){
//         response.writeHead(200);
//         fs.readFile(path.join(_dirnamePages + 'scriptDevise.js'), function (error, data) {
//             response.writeHead(200, { 'Content-Type': 'text/javascript' });
//             response.write(data);
//             response.end();
//         });
//     }
//     else if(url === '/calculImc'){
//         response.writeHead(200);
//         fs.readFile(path.join(_dirnamePages + 'pages/calculImc.html'), function (error, data) {
//             response.writeHead(200, { 'Content-Type': 'text/html' });
//             response.write(data);
//             response.end();
//         });
//     }
//     else if((url === '/convDevise')){
//         response.writeHead(200);
//         fs.readFile(path.join(_dirnamePages + 'pages/convDevise.html'), function (error, data) {
//             response.writeHead(200, { 'Content-Type': 'text/html' });
//             response.write(data);
//             response.end();
//         });
//         //Détection envoi formulaire
//         if(request.method == 'POST') {
//             request.on('data',  (data) => { 
//                 tauxFct.change(pathFile, data);
//             });
//         }
//     }
//     else if((url === '/inscription')){
//         response.writeHead(200);
//         fs.readFile(path.join(_dirnamePages + 'pages/inscription.html'), function (error, data) {
//             response.writeHead(200, { 'Content-Type': 'text/html' });
//             response.write(data);
//             response.end();
//         });
//         //Détection envoi formulaire
//         if(request.method == 'POST') {
//             request.on('data',  (data) => { 
//                 console.log("Soummission du formulaire d'inscription")
//             });
//         }
//     }
//     else if(extname === '.png'){
//         response.writeHead(200, { 'Content-Type': 'image/png' });
//         fs.createReadStream(`${_dirnamePages}${url}`).pipe(response);
//     }
//     else if(extname === '.css'){
//         response.writeHead(200, { 'Content-Type': 'text/css' });
//         fs.createReadStream(`${_dirnamePages}${url}`).pipe(response);
//     }

// });

//Socket permet le lien entre le script js du browser client et le server 
const io = new Server(server);
io.on('connection', socket => {
    console.log(`connect ${socket.id}`);
    console.log(imcFct.userIMC);
    socket.emit('actuValue', tauxFct.montantsSaisie); //Génère l'évènement provoquant l'envoie des montants de devise actualisés après calcul
    socket.emit('actuIMC', imcFct.userIMC); //Génère l'évènement provoquant l'envoie des montants de devise actualisés après calcul
});

//Choix du port pour le serveur local
server.listen(port);



