const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config.js');

const PostCtrl = require('../controllers/post');

router.get('/', auth, PostCtrl.getAllPost);
router.post('/', auth, multer, PostCtrl.createPost);
router.get('/:id', auth, PostCtrl.getOnePost);
router.put('/feed:id', auth, multer, PostCtrl.modifyPost);
//router.delete('/:id', auth, PostCtrl.deletePost);
//router.post('/:id/like', auth, PostCtrl.likePost);



module.exports = router;

