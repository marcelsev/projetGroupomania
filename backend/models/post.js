const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String, },
    video: { type: String, },
    likes: { type: Number, default: 0, required: true },
    dislikes: { type: Number, default: 0, required: true },
    usersLiked: { type: Array, defautl: [], required: true },
    usersDisliked: { type: Array, default: [], required: true },
},
    { timestamps: true, }
);

module.exports = mongoose.model('posts', postSchema);