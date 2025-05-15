const express = require('express');
const router = express.Router();
const StartUpController = require('../controllers/StartUpController');

router.post('/create', StartUpController.create);
router.post('/delete', StartUpController.delete);
router.get('/all', StartUpController.getAll);

module.exports = router;