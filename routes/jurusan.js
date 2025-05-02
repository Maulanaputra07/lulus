const router = require('express').Router();
const controller = require('../controller/jurusan.js');

router.get('/', controller.index);

module.exports = router;