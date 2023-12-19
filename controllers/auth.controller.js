const db = require('../models/index')
const User = db.user
const bcrypt = require('bcryptjs')


// Desc    Get login page
// Route   GET /login 
// Access  Public
const getLoginPage = ( req, res) => {
    // console.log(req.session.isLogged);
  res.render('auth/login',{
    title: 'Login',
    errorMessage: req.flash('error')
  })
}


// Desc     login user
// Route   POST /login 
// Access  Public
const loginUser = async ( req, res) => {
   try {
    const userExist = await User.findOne({where: {email: req.body.email}})
    if (userExist) {
        const matchPassword = await bcrypt.compare(req.body.password, userExist.password)
        if (matchPassword) {
            req.session.isLogged = true
            req.session.user = userExist
            req.session.save(err=>{
                if (err) throw  err
                return res.redirect('/')
            })
        }else{
          req.flash('error', ' Siz xato parol yoki email kiritdingiz!')
          return res.redirect('/login')
        }
      }else{
        req.flash('error', ' Siz xato parol yoki email kiritdingiz!')
        return res.redirect('/login')
    }
   } catch (error) {
    console.log(error);
   }
  }

//Desc      Logout user
//Route     POST /logout
//Access    Private
const logout = (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login')
    })
  }  


  
  //Desc      Register User
  //Route     POST /register
  //Access    Public
  const registerUser = async (req, res) => {
    try {
      const {email, name, password, password2} = req.body
      if(password !== password2){
       req.flash('error', 'Kiritilgan parol xato!')
           return res.redirect('/register')
        }
            
      const userExist = await User.findOne({where:{ email }})
      if (userExist) {
          req.flash('error', 'Bu email manzili topilmadi!')
          return res.redirect('/register')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
      await User.create({
            email,
            name,
            password: hashedPassword
      })
      return res.redirect('/login')
    } catch (error) {
        console.log(error)
    }
}
//Desc      Get registration page
//Route     GET /register
//Access    Public
const getRegisterPage = async (req, res) => {
    try {
      res.render('auth/register', {
        title: 'Sign-up',
        errorMessage: req.flash('error')
      })
    } catch (error) {
      console.log(error)
    }
  }

module.exports = {
     getLoginPage, 
     loginUser,
     logout,
     registerUser,
     getRegisterPage,
}