const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');
const upload = require('../middlewares/upload');

router.post('/create', upload.single('image'), StudentController.create);
router.get('/all', StudentController.getAll);
router.get('/get', StudentController.get);

module.exports = router;