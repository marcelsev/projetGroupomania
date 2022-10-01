const PostModel = require('../models/post');
const fs = require('fs');


module.exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    console.log(postObject);
    delete postObject._id;
    const post = new PostModel({
        ...postObject,

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
        .then(() => { res.status(201).json({ message: 'post enregistré' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyPost = (req, res, next) => {
};


exports.getAllPost = (req, res, next) => {
    PostModel.find()
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }))
};

exports.deletePost= (req, res, next) =>{

};