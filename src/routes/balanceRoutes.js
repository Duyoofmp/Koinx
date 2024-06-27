const express = require('express');
const balanceController = require('../controllers/balanceController');

const router = express.Router();


router.post('/', balanceController.getBalance);

module.exports = router;
