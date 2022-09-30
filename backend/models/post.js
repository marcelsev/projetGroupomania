const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    posterId: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String, },
    video:{ type: String, },
    likes: { type: Number, default: 0, required: true },
    dislikes: { type: Number, default: 0, required: true },
    usersLiked: { type: Array, defautl: [], required: true },
    usersDisliked: { type: Array, default: [], required: true }
});

module.exports = mongoose.model('post', PostSchema);