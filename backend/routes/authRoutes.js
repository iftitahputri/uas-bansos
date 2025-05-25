const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register/penyedia', authController.registerPenyedia);
router.post('/register/penerima', authController.registerPenerima);

router.post('/login', authController.login);

module.exports = router;
