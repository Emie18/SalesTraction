const express = require('express');
const router = express.Router();
const DataController = require('../controllers/DataController');

router.get('/regions', DataController.region);

module.exports = router;