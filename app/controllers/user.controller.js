const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.count = (req, res) => {
    User.estimatedDocumentCount()
        .exec()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(400).json(err);
        })  
}

exports.editOneById = (req,res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    User.findByIdAndUpdate(req.params.id, req.body)
        .exec()
        .then(result => {
            return res.status(200).json("L'utilisateur a été modifié");
        })
        .catch(err => {
            return res.status(400).json(err);
        })    
}