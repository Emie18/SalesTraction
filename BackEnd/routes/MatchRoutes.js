const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/MatchController');

router.post('/like', MatchController.like);
router.get('/suggestion/:id', MatchController.suggestion);

module.exports = router;