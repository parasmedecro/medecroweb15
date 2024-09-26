const express = require('express')

const router = express.Router();

const {createUser,loginAuth}  = require('../Controller/userController')

router.post('/create',createUser)
router.post('/login',loginAuth)

module.exports = router;