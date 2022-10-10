const UserModel = require("../models/user");
const ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { signUpErrors, signInErrors } = require("./errors");

module.exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new UserModel({
                email: req.body.email,
                pseudo: req.body.pseudo,
                password: hash,
                admin: false
            });
            user.save()
                .then(() => res.status(201).json({ message: 'utilisateur créé' }))
                .catch(err => {const errors= signUpErrors(err); res.status(200).json({ message: 'utilisateur/email déjà enregistré ', errors })});
        })
        .catch (err => { const errors= signUpErrors(err);
        res.status(200).send({errors})});
    
};

module.exports.signIn = (req, res, next) => {
    UserModel.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ errors});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(402).json({ errors });
                }
                res.status(200).json({
                    userId: user._id,
                    admin: user.admin,
                    pseudo: user.pseudo,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(err => {const errors= signInErrors(err); res.status(200).json({ message: 'email ou mot de passe incorrecte', errors })});
    })
    .catch(err => {const errors= signInErrors(err); res.status(200).send({ message: 'incorrecte ', errors })});
};

module.exports.logout = (req, res, next) => {
    const maxAge = 24;
    res.cookie('jwr', '', {maxAge: 1});
    res.redirect('/');
}

module.exports.getAllUsers = async (req, res, next) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('-password');
};