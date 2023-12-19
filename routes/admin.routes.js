const { Router } = require('express')

//Initial user.cotroller.js 
const {
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
} = require('../controllers/admin.controller')

const router = Router()

const {authenticate, guest, protected} = require('../middlewares/auth')
const upload = require('../utils/fileUpload')

//get and post admin-page 
router.get('/admin/page',  getPostAdminPage)
router.post('/admin/page', postAdminPage )
// Get Main Page
router.get('/admin', authenticate, getAdminPage)
router.post('/admin',  postAdminPage)

// Get addchange Page
router.get('/admin/addchange', authenticate,   getAdminAddChangePage)
// Post addchange Page
router.post('/admin/addchange/add',upload.single('imageUrl'),  postAdminAddChangePage)
// Delete changes
router.post('/admin/addchange/delete/:id', deleteChanges)
// Update change Page
router.get('/admin/update/:id', authenticate, updateAddChangePage )
// Update change
router.post('/admin/update/:id', updateChange) 

// Get Admin Users page
router.get('/admin/users', authenticate, getAdminUserPage)
// Delete exchanges
router.post('/delete/:id', deleteExchanges)

module.exports = router
