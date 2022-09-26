console.log("Lancement de l'application");

require('./config/.env');


const tauxFct = require('./assets/js/tauxDevise.js');
const imcFct = require('./assets/js/calculIMC.js');
const inscrFct = require('./assets/js/inscription.js');
const postsFct = require('./assets/js/posts.js')

//Création du serveur local
const express = require('express');
const app = express();
const port = 3331;

let http = require('http');
let fs = require('fs');
let path = require('path');
const { Server } = require("socket.io");


app.set('views', './src/pages');
app.set('view engine', 'ejs');

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

//Routage vers page inscription
app.get('/inscription', (request, response) => {
    fs.readFile(path.join(_dirnamePages + 'pages/inscription.html'), function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
})

//Routage POST page inscription
app.post('/inscription', (request, response) => {
        request.on('data',  (data) => {
            inscrFct.validationProfil(data)
        });
        fs.readFile(path.join(_dirnamePages + 'pages/inscription.html'), function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    });

//Routage GET vers page Liste Posts
app.get('/listPosts', (req, res) => {
    res.render('listePosts', {
        listPosts: postsFct.listPosts
    });
})

//Routage POST page Liste Posts
app.post('/listPosts', (req, res) => {
    req.on('data', (data) => {
        postsFct.lovePost(data)
    // Rafraichi la page une fois la mise à jour de l'appréciation
    }).on('end', ()=>{
        res.render('listePosts', {
            listPosts: postsFct.listPosts
        });
    });

})

//Routage vers les fichiers CSS 
app.use(express.static(_dirnamePages + '/assets'));

//Création du serveur HTTP
const server = http.createServer(app);


//Socket permet le lien entre le script js du browser client et le server 
const io = new Server(server);
io.on('connection', socket => {
    console.log(`connect ${socket.id}`);
    socket.emit('actuValue', tauxFct.montantsSaisie); //Génère l'évènement provoquant l'envoie des montants de devise actualisés après calcul
    socket.emit('actuIMC', imcFct.userIMC); //Génère l'évènement provoquant l'envoie des montants de devise actualisés après calcul
    socket.emit('actuInscr', inscrFct.Message, inscrFct.profil);
});

//Choix du port pour le serveur local
server.listen(port);



