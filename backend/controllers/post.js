const PostModel = require('../models/post');
const fs = require('fs');
//const { post } = require('../app');
//const filename = require('../middleware/multer-config');

/*exports.createPost = (req,res,next)=>{
    if (req.file){
        const userId= req.params.id;
        console.log(userId);
        const message = req.body.message;
        console.log(message);
        const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        console.log(image);
        const post = new PostModel({
            userId,
            message,
            image,
        }) 
        function poster (err , res){
        if (err){
            return res.status(404).json({message: 'error post'});
        } else{
            post.save () 
            .then(()=> res.status(200).json({message: 'validé'}))
            .catch (error=> {res.status(401).json})
        } console.log(post);
    }
    } else {
        const userId = req.params.id;
        const message = req.body.message;
        const post = new PostModel({
            userId,
            message,
            
        })
        function poster (err , res){
        if (err){
            return res.status(404).json({message: 'error post'});
        } else{
            post.save ()
            .then(()=> res.status(200).json({message: 'validé'}))
            .catch (error=> {res.status(401).json})

    }

}}}*/

exports.createPost = (req, res, next) => {
    console.log(req.body.post);
    const postObject = req.body;
    const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
console.log(postObject);
    delete postObject._id;
    if (req.file !== null) {
        const post = new PostModel({
            ...postObject,
            userId: req.auth.userId,
        imageUrl: image
        }); console.log(post)
        post.save() 
            .then(() => { res.status(201).json({ message: 'post enregistré' }); console.log('ok') })
            .catch(error => { res.status(401).json({ error }); console.log(error) })
            console.log(post)
    } else {
        const post = new PostModel({
            ...postObject,
            userId: req.auth.userId,

        });
        post.save()
            .then(() => { res.status(201).json({ message: 'post enregistré' }); console.log('ok') })
            .catch(error => { res.status(401).json({ error }); console.log(error) })
    }
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
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
};


exports.deletePost = (req, res, next) => {
    PostModel.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' })
            } else {
                const filename = post.imageUrl.split('/images')[1];
                fs.unlink(`images/${filename}`, () => {
                    PostModel.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: ' Supprimée' }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.likePost = (req, res, next) => {
    switch (req.body.like) {
        case 1:
            PostModel.updateOne({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } })
                .then(() => res.status(200).json({ message: ' likée' }))
                .catch(error => res.status(400).json({ error }));
            break;

        case -1:
            PostModel.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } })
                .then(() => res.status(200).json({ message: ' dislikée' }))
                .catch(error => res.status(400).json({ error }));
            break;

        case 0:
            PostModel.findOne({ _id: req.params.id })
                .then(post => {

                    if (post.usersLiked.includes(req.body.userId)) {
                        PostModel.updateOne(
                            { _id: req.params.id },
                            { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
                        )
                            .then(() => res.status(201).json({ message: 'Like annulé' }))
                            .catch((error) => res.status(400).json({ error }));
                    }

                    else if (post.usersDisliked.includes(req.body.userId)) {
                        PostModel.updateOne(
                            { _id: req.params.id },
                            { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
                        )
                            .then(() => res.status(201).json({ message: 'dislike annulé' }))
                            .catch((error) => res.status(400).json({ error }));
                    }

                    else {
                        res.status(403).json({ message: "erreur." })
                            .catch((error) => res.status(400).json({ error }));
                    }
                })
                .catch(() => res.status(500).json({ error }));
            break;
    }
};
