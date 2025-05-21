const express = require('express');
const router = express.Router();
const StartUpController = require('../controllers/StartUpController');
const upload = require('../middlewares/upload');

router.post('/create', upload.single('image'), StartUpController.create);
router.get('/all', StartUpController.getAll);
router.get('/get', StartUpController.get);
router.get('/offer/:id', StartUpController.getOffers);
module.exports = router;