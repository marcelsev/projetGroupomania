const PostModel = require('../models/post');
const UserModel = require('../models/user');
const ObjectID = require ('mongoose').Types.ObjectId;
const fs = require('fs');


module.exports.createPost =  (req, res, next) => {
/*const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    imageUrl:  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
});
try {
    const post = await newPost.save();
    return res.status(201).json(post);
} catch (err){
    return res .status(401).send (err);
} --> */

    const postObject = JSON.parse(req.body.post);
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
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    PostModel.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'vous ne pouvez pas modifier' });
            } else {
                PostModel.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'post modifiée' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }))
};


exports.getAllPost = (req, res, next) => {
    PostModel.find()
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }))
};

exports.deletePost= (req, res, next) =>{

};