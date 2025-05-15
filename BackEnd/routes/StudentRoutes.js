const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');

router.post('/create', StudentController.create);
router.post('/delete', StudentController.delete);
router.get('/all', StudentController.getAll);

module.exports = router;