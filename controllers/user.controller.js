const db = require('../models/index')
// const Exchange = db.exchange
const Change = db.change

// Desc    Get main page
// Route   GET / 
// Access  Public
const getMainPage = async ( req, res) => {
  const change = await Change.findAll({
    raw: true
  })
  res.render('user/userpage',{
    title: 'XBITOBMEN.uz',
    isAuthenticated: req.session.isLogged,
    errorMessage: req.flash('error'),
    successMessage: req.flash('success'),
    change: change

  })
}

// Desc    Get change page
// Route   GET /change 
// Access  Public
const getChangePage = async ( req, res) => {
  const change = await Change.findAll({
    raw: true
  })
 
  res.render('user/change',{
    title: 'XBITOBMEN.uz',
    isAuthenticated: req.session.isLogged,
    change: change
  })
}



module.exports = { getMainPage, getChangePage }