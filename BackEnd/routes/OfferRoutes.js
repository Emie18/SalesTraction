const express = require('express');
const router = express.Router();
const OfferController = require('../controllers/OfferController');

router.post('/create', OfferController.create);
router.post('/update', OfferController.update);
router.get('/delete', OfferController.delete);
router.get('/all', OfferController.getAll);

router.post('/apply', OfferController.apply);
router.get('/applications/:id', OfferController.getApplication);

module.exports = router;