const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');
const auth = require('../middlewares/token');

router.post('/login', AccountController.login);
router.post('/delete', auth, AccountController.delete);

module.exports = router;