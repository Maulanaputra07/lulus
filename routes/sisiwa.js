const router = require('express').Router();
const controller = require('../controller/siswa.js');

router.get('/data', controller.all);
router.get('/data/absen', controller.show);
router.get("/", controller.index);
router.put('/', controller.update);
router.post('/', controller.store);
router.delete('/:nis', controller.delete);

module.exports = router;