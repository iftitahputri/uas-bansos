const express = require('express');
const router = express.Router();
const controller = require('../controllers/penerimaController');
const {verifyToken, penerimaOnly} = require('../middleware/authMiddleware');

router.use(verifyToken, penerimaOnly); 

router.get('/dashboard', controller.getDashboardPenerima);
router.get('/riwayat', controller.getRiwayatBansos);
router.get('/daftar', controller.getDaftarBansos);

router.post('/request', controller.requestBansos);

module.exports = router;