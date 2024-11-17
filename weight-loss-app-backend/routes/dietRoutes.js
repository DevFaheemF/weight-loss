const express = require('express');
const { addWeight, getProgress } = require('../controllers/dietController');
const router = express.Router();

router.post('/add', addWeight);
router.get('/progress', getProgress);

module.exports = router;
