const { Router } = require('express');
const router = Router();
const {getAllTypes} =require('../controllers/type')


router.get('/', getAllTypes );

module.exports = router;
