const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config.js');
const postCtrl = require('../controllers/post');

router.get('/feed',  postCtrl.getAllPost);
router.post('/feed', auth,  multer, postCtrl.createPost);
router.put('/feed:id',  multer, postCtrl.modifyPost);
router.delete('/feed:id',  postCtrl.deletePost);
//router.post('/:id/like', auth, PostCtrl.likePost);



module.exports = router;

