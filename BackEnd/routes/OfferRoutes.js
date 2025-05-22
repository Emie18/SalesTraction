const express = require('express');
const router = express.Router();
const OfferController = require('../controllers/OfferController');
const auth = require('../middlewares/token');

router.post('/create', auth, OfferController.create);
router.post('/update', auth, OfferController.update);
router.post('/delete', auth, OfferController.delete);
router.get('/all', OfferController.getAll);

router.post('/apply', auth, OfferController.apply);
router.get('/applications/:id', auth, OfferController.getApplication);

module.exports = router;