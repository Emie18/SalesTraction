const express = require('express');
const router = express.Router();
const DataController = require('../controllers/DataController');

router.get('/regions', DataController.region);
router.get('/lauguages', DataController.lauguage);
router.get('/modes', DataController.work_mode);
router.get('/schools', DataController.school);
router.get('/states', DataController.offer_state);

module.exports = router;