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

const lovePost = (req, res) => {
    let newloveit = 0;
    if (req.body.love!==undefined){ //Détection d'un appui sur love it
        newloveit = Number(req.body.loveit) + 1
    } else if (req.body.dontlove!==undefined){ //Détection d'un appui sur love it
        newloveit = Number(req.body.loveit) - 1
    }

    Post.findOneAndUpdate({ id: req.body._id }, {$set:{loveit : newloveit}}, (err, post) => {
        console.log('update love it done')
        res.redirect('/listPosts');
    });
};

const getOnePost = (req, res) => {
    Post.findOne({ id: req.body._id }, (err, post) => {
        if (err) {
            res.send(err);
        };
        res.render('updatePost', {
            post: post,
            id: post._id,
            session: session
        });
    });
};

const updatePost = (req, res) => {
    const update = {
        titre: req.body.titre,
        content: req.body.content,
        created_date : Date.now()
    }
    Post.findOneAndUpdate({ id: req.body._id }, update, (err, post) => {
        console.log('update post done')
        res.redirect('/listPosts');
    });
};

const deletePost = (req, res) => {
    Post.deleteOne({ id: req.body._id }, (err, post) => {
        console.log('delete post done')
        res.redirect('/listPosts');
    });
};

module.exports = { addNewUser, findUser,addNewIMC, getImc, 
                    addNewChange, getDevises, addNewPost, getPosts, 
                    lovePost, getOnePost, updatePost, deletePost, listIMC, session }