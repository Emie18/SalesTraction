const express = require('express');
const router = express.Router();
const StartUpController = require('../controllers/StartUpController');

router.post('/create', StartUpController.create);
router.get('/all', StartUpController.getAll);
router.get('/get', StartUpController.get);
router.get('/offer/:id', StartUpController.getOffers);
module.exports = router;