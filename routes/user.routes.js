const { Router } = require('express')

//Initial user.cotroller.js 
const {getMainPage, 
       getChangePage} = require('../controllers/user.controller')
//Initial auth.controller.js
const {getLoginPage,
       loginUser,
       logout, 
       getRegisterPage, 
       registerUser
      } = require('../controllers/auth.controller')

const router = Router()

//Middlewares 
const {protected, guest} = require('../middlewares/auth')

// Get Main Page
router.get('/', getMainPage)

// Get Change Page
router.get('/change',  getChangePage)


// Get Login Page
router.get('/login', guest, getLoginPage)

//  Login User
router.post('/login', guest, loginUser)

// Logout User
router.get('/logout', logout)

// Get Register Page
router.get('/register', guest, getRegisterPage)

// Register User
router.post('/register', guest, registerUser)

module.exports = router
