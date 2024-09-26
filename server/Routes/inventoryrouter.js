const express = require('express')

const {addDrug,getDrugs} = require('../Controller/inventorycontroller')

const router = express.Router()

router.post('/add',addDrug)
router.get('/get',getDrugs)
    
module.exports = router