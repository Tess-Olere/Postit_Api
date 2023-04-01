const router = require('express').Router();
const {signUp, login} = require('../controller/auth')

router.post('/signUp', signUp)
router.post('/login', login)

module.exports = router