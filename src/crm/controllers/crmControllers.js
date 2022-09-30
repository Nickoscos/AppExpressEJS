const mongoose = require('mongoose');
const Schema = require('../models/crmModel');

const User = mongoose.model('User', Schema.UserSchema);
const Imc = mongoose.model('Imc', Schema.ImcSchema);

let session = {
    message: "",
    active: false
};

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
        //res.json(user);
    })
}

module.exports = { addNewUser, findUser,addNewIMC, session }