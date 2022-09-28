const CPost = require('../models/post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new CPost({
        ...postObject,

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
        .then(() => { res.status(201).json({ message: 'post enregistré' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    CPost.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'vous ne pouvez pas modifier' });
            } else {
                CPost.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'post modifiée' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }))
};