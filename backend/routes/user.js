const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.signup);
router.post('/login', userCtrl.signIn);
router.get('/', userCtrl.getAllUsers);
router.get('/:id' , userCtrl.userInfo);
router.get ("/logout", userCtrl.logout);

module.exports = router;