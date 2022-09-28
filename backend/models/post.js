const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0, required: true },
    dislikes: { type: Number, default: 0, required: true },
    usersLiked: { type: Array, defautl: [], required: true },
    usersDisliked: { type: Array, default: [], required: true }
});

module.exports = mongoose.model('Sauces', sauceSchema);