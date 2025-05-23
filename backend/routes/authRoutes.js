const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// register
router.post('/register/penyedia', authController.registerPenyedia);
router.post('/register/penerima', authController.registerPenerima);

// login
router.post('/login', authController.login);

module.exports = router;
