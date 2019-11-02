var express = require('express');
var router = express.Router();
const scg = require('../controllers/ScgController')

/* GET users listing. */
router.post('/webhook', scg.index);

module.exports = router;