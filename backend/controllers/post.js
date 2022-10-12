const PostModel = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postObject = req.body;
  //console.log(req.file);
  delete postObject._id;
  if (req.file) {
    const post = new PostModel({
      ...postObject,
      userId: req.auth.userId,
      image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({ message: "post enregistré" });
        console.log("ok");
      })
      .catch((error) => {
        res.status(401).json({ error });
        console.log(error);
      });
  } else {
    const post = new PostModel({
      ...postObject,
      userId: req.auth.userId,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({ message: "post enregistré" });
        console.log("ok");
      })
      .catch((error) => {
        res.status(401).json({ error });
        console.log(error);
      });
  }
};

exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId === req.auth.userId || req.auth.admin) {
        PostModel.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "post modifiée" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(401).json({ message: "vous ne pouvez pas modifier" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllPost = (req, res, next) => {
  PostModel.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId === req.auth.userId || req.auth.admin) {
        const filename = post.image.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          PostModel.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: " Supprimée" }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        res.status(401).json({ message: "Not authorized" });
      }
    })
    .catch((error) => {
      console.log(error, "error delete");
    });
};

exports.likePost = (req, res, next) => {
  switch (req.body.like) {
    case 1:
      PostModel.updateOne(
        { _id: req.params.id },
        { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } }
      )
        .then(() => res.status(200).json({ message: " likée" }))
        .catch((error) => res.status(400).json({ error }));
      break;

    case 0:
      PostModel.findOne({ _id: req.params.id })
        .then((post) => {
          if (post.usersLiked.includes(req.body.userId)) {
            PostModel.updateOne(
              { _id: req.params.id },
              { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
            )
              .then(() => res.status(201).json({ message: "Like annulé" }))
              .catch((error) => res.status(400).json({ error }));
          } else {
            res
              .status(403)
              .json({ message: "erreur." })
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(500).json({ error }));
      break;
  }
};
