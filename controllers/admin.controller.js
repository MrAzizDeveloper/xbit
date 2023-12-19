const db = require('../models/index')
const Exchange = db.exchange
const User = db.user
const Change = db.change

// Desc    Get  exchanges
// Route   GET /admin 
// Access  ADMIN
const getAdminPage = async ( req, res) => {
    try {
        const exchanges = await Exchange.findAll({
            raw: true
        })
        // const matchRemoveCard = await bcrypt.compare(req.body.removeValueCard, hashedRemoveValueCard)
        res.render('user/adminpage',{
          title: 'Admin Page',
          exchanges: exchanges,
          errorMessage: req.flash('error')
        })
      } catch (error) {
        
    }
  }
  // Desc    Post  changes
  // Route   Post /admin/addchange 
  // Access  ADMIN
  const postAdminAddChangePage = async ( req, res) => {
    try {
      const { text, text2 }= req.body
      const fileUrl = req.file ? '/uploads/'+ req.file.filename : ''
      await Change.create({
        text: text,
        text2: text2,
        imageUrl: fileUrl
      })
      res.redirect('/admin/addchange')      
    } catch (error) {
      console.log(error);   
    }
  }
  
  // Desc    Get  changes
  // Route   GET /admin/addchange 
  // Access  ADMIN
  const getAdminAddChangePage = async ( req, res) => {
    try {
      const change = await Change.findAll({
        raw: true
    })
  
     res.render('user/add-change',{
      title: 'add Change',
      change: change
     })
            
      } catch (error) {
     console.log(error);   
    }
  }

  // Desc    Delete  changes
// Route   POST /admin/addchange/:id delete 
// Access  ADMIN
const deleteChanges = async ( req, res) => {
  try {
      await Change.destroy({
          where: {id: req.params.id}
      })
      res.redirect('/admin/addchange')
  } catch (error) {
      
  }
}
//Desc      Update diary
//Route     GET /diary/update/:id
//Access    Admin
const updateAddChangePage = async (req, res) => {
  try {
    const change = await Change.findByPk(req.params.id, {
      raw: true
    })
    res.render('user/update-change', {
      title: 'Edit change',
      change: change
    })
  } catch (error) {
    console.log(error)
  }
}
//Desc      Update change
//Route     POST /diary/update/:id
//Access    Admin
const updateChange = async (req, res) => {
  try {
    await Change.update({ text: req.body.text, text2: req.body.text2 }, {
      where: { id: req.params.id }
    })
    res.redirect('/admin/addchange')
  } catch (error) {
    console.log(error)
  }
}

  const getPostAdminPage = (req,res)=>{
   try {
     res.render('user/admin-parol',{
       title: 'Checking Admin',
       isAuthenticated: req.session.isAuthenticated,
       errorMessage: req.flash('error')
     })
   } catch (error) {
    console.log(error);
   } 
  }

// Desc    Get  admin users
// Route   GET /admin/users 
// Access  ADMIN
const getAdminUserPage = async ( req, res) => {
  try {
      const user = await User.findAll({
          raw: true
      })
      res.render('user/admin-users',{
        title: 'Users page',
        user: user
      })
    } catch (error) {
      console.log(error);
  }
}

// Desc    Post  admin page
// Route   POST /admin 
// Access  ADMIN
const postAdminPage = (req,res)=>{

  const password = req.body.password;
  if (password === process.env.PAROL) {
    req.session.isAuthenticated = true; // Set isAuthenticated flag in session
    res.redirect('/admin'); // Redirect to the admin page
  } else {
    req.flash('error', 'Parol Xato!') // Display an error message
  }
}  



// Desc    Delete  exchanges
// Route   POST /admin/delete/:id delete 
// Access  ADMIN
const deleteExchanges = async ( req, res) => {
    try {
        await Exchange.destroy({
            where: {id: req.params.id}
        })
        res.redirect('/admin')
    } catch (error) {
        
    }
  }

  module.exports = {
     getAdminPage, 
     deleteExchanges,
     postAdminPage,
     getPostAdminPage,
     getAdminUserPage,
     getAdminAddChangePage,
     postAdminAddChangePage,
     deleteChanges,
     updateAddChangePage,
     updateChange
    }