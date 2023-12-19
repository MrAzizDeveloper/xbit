const { Router } = require('express')

//Initial user.cotroller.js 
const { addNewExchange } = require('../controllers/exchange.controller')

const router = Router()

const { protected } = require('../middlewares/auth')

// POST exchange in Main Page
router.post('/add', addNewExchange)

module.exports = router
