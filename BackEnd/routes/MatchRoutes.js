const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/MatchController');
const auth = require('../middlewares/token');

router.post('/like', auth, MatchController.like);
router.get('/suggestion/:id', auth, MatchController.suggestion);

module.exports = router;