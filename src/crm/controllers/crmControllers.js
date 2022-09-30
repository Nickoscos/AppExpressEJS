const mongoose = require('mongoose');
const Schema = require('../models/crmModel');

const User = mongoose.model('User', Schema.UserSchema);
const Imc = mongoose.model('Imc', Schema.ImcSchema);
const Devises = mongoose.model('Devises', Schema.DevisesSchema);
const Post = mongoose.model('Post', Schema.PostSchema);

let session = {
    message: "",
    active: false
};

let listIMC = [];

const addNewUser = (req, res) => {
    let newUser = new User(req.body)
    console.log(req.body)
    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        }
        //res.json(user);
    })
}

const findUser = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                session.message = 'L\'utilisateur n\'existe pas!';
                session.active = false;
                res.render('connexion', { 
                    etat : session.message 
                });
            } else {
                if(req.body.password === user.password){
                    session.message = 'identification ok';
                    session.active = true;
                    res.render('accueil', {
                        session: session
                    });
                } else {
                    session.message = 'Le mot de passe est erroné';   
                    session.active = false;
                    res.render('connexion', { 
                        etat : session.message 
                    });
                };
            }});
};

const getUser = (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            res.send(err);
        };
        res.json(user);
    });

};

const addNewIMC = (userImc, res) => {
    let newImc = new Imc({
        nom: userImc.nom,
        tailleCm : userImc.tailleCm,
        poidsKg : userImc.poidsKg,
        resultat : userImc.IMC
    });
    newImc.save((err, imc) => {
        if (err) {
            res.send(err);
        }
    })
    Imc.find({}, (err, imc) => {
        if (err) {
            res.send(err);
        };
        res.render('calculImc', {
            nom : userImc.nom,
            tailleCm : userImc.tailleCm,
            poidsKg : userImc.poidsKg,
            resultatIMC : userImc.resultatIMC,
            resultatUser : userImc.resultatUser,
            resultatCORP: userImc.resultatCORP,
            image : userImc.image,
            session: session,
            listIMC: imc
        });
    });

}

const getImc = (req, res) => {
    Imc.find({}, (err, imc) => {
        if (err) {
            res.send(err);
        };
        res.render('calculImc', {
            nom : "",
            tailleCm : "",
            poidsKg : "", 
            resultatUser : "",
            resultatIMC : "",
            resultatUser : "",
            resultatCORP: "",
            image : "",
            session: session,
            listIMC: imc
        });
    });
};

const addNewChange = (montantsSaisie, res) => {
    let newChange = new Devises({
        montantEUR: montantsSaisie.EURO,
        montantUSD: montantsSaisie.USD,
        montantCNY: montantsSaisie.CNY,
    });
    newChange.save((err, devises) => {
        if (err) {
            res.send(err);
        }
    })
    Devises.find({}, (err, changes) => {
        if (err) {
            res.send(err);
        };
        res.render('convDevise', {
            montantEUR: montantsSaisie.EURO,
            montantUSD: montantsSaisie.USD,
            montantCNY: montantsSaisie.CNY,
            session: session,
            listChange: changes
        });
    });
}

const getDevises = (req, res) => {
    Devises.find({}, (err, changes) => {
        if (err) {
            res.send(err);
        };
        res.render('convDevise', {
            montantEUR: 0,
            montantUSD: 0,
            montantCNY: 0,
            session: session,
            listChange: changes
        });
    });
};

const addNewPost = (post, res) => {
    let newPost = new Post({
        titre: post.titre,
        content: post.content,
        loveit: 0,
    });
    newPost.save((err, post) => {
        if (err) {
            res.send(err);
        }
    })
    // Post.find({}, (err, posts) => {
    //     if (err) {
    //         res.send(err);
    //     };
    //     res.render('convDevise', {
    //         session: session,
    //         listPosts: posts
    //     });
    // });
};

const getPosts = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            res.send(err);
        };
        res.render('listePosts', {
            session: session,
            listPosts: posts
        });
    });
};

module.exports = { addNewUser, findUser,addNewIMC, getImc, addNewChange, getDevises, addNewPost, getPosts, listIMC, session }