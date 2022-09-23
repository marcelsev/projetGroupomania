const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.signup);
router.get('/', userCtrl.getAllUsers);
router.get('/:id' , userCtrl.userInfo);
//router.post('/login', userCtrl.login);

module.exports = router;