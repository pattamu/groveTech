const express = require('express')
const router = express.Router()

const {createHospital, updateHospital, getAllHospitals, getHospital} = require('../controller/hospitalController')

router.post('/create', createHospital)
router.put('/:id', updateHospital)

router.get('/all', getAllHospitals)
router.get('/:id', getHospital)

module.exports = router