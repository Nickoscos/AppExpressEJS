console.log("Lancement de l'application");

require('./config/.env');


const tauxFct = require('./assets/js/tauxDevise.js');
const imcFct = require('./assets/js/calculIMC.js');
const inscrFct = require('./assets/js/inscription.js');
const postsFct = require('./assets/js/posts.js');
const crmFct = require('./crm/controllers/crmControllers.js')

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
mongoose.connect('mongodb://localhost/Dashboard_CEGEFOS');

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
    response.render('accueil', {
        session: crmFct.session
    });
})

//Routage vers page calcul IMC
app.get('/calculImc', (request, response) => {
        response.render('calculImc', {
            nom : "",
            tailleCm : "",
            poidsKg : "", 
            resultatUser : "",
            resultatIMC : "",
            resultatUser : "",
            resultatCORP: "",
            image : "",
            session: crmFct.session
        });
})

//Routage POST page calcul IMC
app.post('/calculImc', (request, response) => {
    imcFct.Calcul(request.body);
    console.log(imcFct.userIMC.nom)
    response.render('calculImc', {
        nom : imcFct.userIMC.nom,
        tailleCm : imcFct.userIMC.tailleCm,
        poidsKg : imcFct.userIMC.poidsKg,
        resultatIMC : imcFct.userIMC.resultatIMC,
        resultatUser : imcFct.userIMC.resultatUser,
        resultatCORP: imcFct.userIMC.resultatCORP,
        image : imcFct.userIMC.image,
        session: crmFct.session
    });

});

//Routage vers page convertisseur devise
app.get('/convDevise', (request, response) => {
    response.render('convDevise', {
        session: crmFct.session,
        montantEUR: 0,
        montantUSD: 0,
        montantCNY: 0
    });
})

//Routage POST page convertisseur devise
app.post('/convDevise', (request, response) => { 
    tauxFct.change(pathFile, crmFct.session, request, response);
})

//Routage vers page inscription
app.get('/inscription', (request, response) => {
    response.render('inscription', {
        session: crmFct.session
    });

})

//Routage POST page inscription
app.post('/inscription', (request, response) => {
        inscrFct.validationProfil(request.body);
        if (inscrFct.profil.valid) {
            crmFct.addNewUser(request, response);
            response.render('accueil', {
                session: crmFct.session
            });
        } else {
            response.render('inscription', {
                session: crmFct.session
            });
        }
    });

//Routage GET vers page Liste Posts
app.get('/listPosts', (req, res) => {
    res.render('listePosts', {
        listPosts: postsFct.listPosts,
        session: crmFct.session
    });
})

//Routage POST page Liste Posts
app.post('/listPosts', (req, res) => {
    // req.on('data', (data) => {
        postsFct.lovePost(req.body)
    // Rafraichi la page une fois la mise à jour de l'appréciation
    // }).on('end', ()=>{
        res.render('listePosts', {
            listPosts: postsFct.listPosts,
            session: crmFct.session
        });
    // });
})

//Routage GET vers page new Post
app.get('/newPost', (req, res) => {
    res.render('newPost', {
        session: crmFct.session
    });
})

//Routage POST page new Posts
app.post('/newPost', (req, res) => {
    //req.on('data', (data) => {
    postsFct.addPost(req.body)
    // Rafraichi la page une fois la mise à jour de l'appréciation
    // }).on('end', ()=>{
    res.redirect('/listPosts');
    // });
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
});

//Routage PUT page new Posts
app.put('/ListPosts/:id', (req, res) => {
    let id = req.params.id
    req.on('data', (data) => {
        postsFct.updatePost(data, id)
    // Rafraichi la page une fois la mise à jour de l'appréciation
    }).on('end', ()=>{
        res.redirect('/listPosts');
    });
});

//Routage vers page connexion
app.get('/connexion', (request, response) => {
    response.render('connexion', { 
        etat : "",
        session: crmFct.session
    });
    console.log(crmFct.session.message);
});

//Routage POST page inscription
app.post('/deconnexion', (request, response) => {
    crmFct.session.message = "";
    crmFct.session.active = false;
    response.render('accueil' , {
        session: crmFct.session
    });
});

//Routage POST page connexion
app.post('/connexion', (request, response) => {
    crmFct.findUser(request, response);
});

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



