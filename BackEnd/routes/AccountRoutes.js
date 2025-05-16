const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');

router.post('/login', AccountController.login);
router.get('/delete', AccountController.delete);

module.exports = router;