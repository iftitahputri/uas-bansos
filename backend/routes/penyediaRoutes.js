const express = require('express');
const router = express.Router();
const controller = require('../controllers/penyediaController');
const { verifyToken, penyediaOnly } = require('../middleware/authMiddleware');

router.use(verifyToken, penyediaOnly);

router.get('/dashboard', controller.getDashboardPenyedia);
router.get('/daftar', controller.getDatabaseBansos);
router.get('/riwayat', controller.getTransaksiBansos);

router.post('/add', controller.addPaket);
router.put('/edit/:id_paket', controller.editPaket);
router.delete('/delete/:id_paket', controller.deletePaket);

module.exports = router;