const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config.js');
const postCtrl = require('../controllers/post');

router.get('/feed', auth, postCtrl.getAllPost);
router.post('/feed', auth, multer, postCtrl.createPost);
router.put('/feed:id', auth, multer, postCtrl.modifyPost);
router.delete('/feed:id', auth, postCtrl.deletePost);
//router.post('/:id/like', auth, PostCtrl.likePost);



module.exports = router;

