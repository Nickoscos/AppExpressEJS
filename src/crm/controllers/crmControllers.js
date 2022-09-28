const mongoose = require('mongoose');
const Schema = require('../models/crmModel');

const User = mongoose.model('User', Schema.UserSchema);

const addNewUser = (req, res) => {
    let newUser = new User(req.body)

    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    })
}

module.exports = { addNewUser }