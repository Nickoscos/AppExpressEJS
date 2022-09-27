console.log("Lancement de l'application");

require('./config/.env');


const tauxFct = require('./assets/js/tauxDevise.js');
const imcFct = require('./assets/js/calculIMC.js');
const inscrFct = require('./assets/js/inscription.js');
const postsFct = require('./assets/js/posts.js');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Création du serveur local
const express = require('express');
var methodOverride = require('method-override')
const app = express();
const port = 3331;

let http = require('http');
let fs = require('fs');
let path = require('path');
const { Server } = require("socket.io");


//Connection mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/DASHBOARD_CEGEFOS');

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', './src/pages');
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

//Chemin du fichier contenant les taux de devise
let pathFile = 'src/assets/json/taux.json';


//Routage vers page accueil
app.get('/', (request, response) => {
    response.render('accueil');
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
        // request.on('data',  (data) => {
            inscrFct.validationProfil(request.body);
        // });
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

//Routage GET vers page new Post
app.get('/newPost', (req, res) => {
    res.render('newPost');
})

//Routage POST page new Posts
app.post('/newPost', (req, res) => {
    req.on('data', (data) => {
        postsFct.addPost(data)
    // Rafraichi la page une fois la mise à jour de l'appréciation
    }).on('end', ()=>{
        res.redirect('/listPosts');
    });
});

//Routage DELETE page new Posts
app.delete('/ListPosts/:id', (req, res) => {
    //res.send('Got a DELETE request at /listPosts');
    req.on('data', (data) => {
        postsFct.deletePost(data)
    // Rafraichi la page une fois la mise à jour de l'appréciation
    }).on('end', ()=>{
        res.redirect('/listPosts');
    });
})

//Routage GET page new Posts
app.get('/ListPosts/:id', (req, res) => {
    let id = req.params.id
    console.log(id)
    res.render('updatePost', {
        post: postsFct.listPosts[id],
        id: id
    });
})

//Routage PUT page new Posts
app.put('/ListPosts/:id', (req, res) => {
    let id = req.params.id
    req.on('data', (data) => {
        postsFct.updatePost(data, id)
    // Rafraichi la page une fois la mise à jour de l'appréciation
    }).on('end', ()=>{
        res.redirect('/listPosts');
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



