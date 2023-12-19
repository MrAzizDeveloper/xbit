const protected = (req,res,next)=>{
    if (!req.session.isLogged) {
        res.redirect('/login')
    }
    next()
}
const guest = (req,res,next)=>{
    if (req.session.isLogged) {
        res.redirect('/')
    }
    next()
}

const authenticate = (req, res, next) => {
    const isAuthenticated = req.session.isAuthenticated;
    if (isAuthenticated) {
        next(); // User is authenticated, proceed to the next middleware or route handler
      } else {
        res.redirect('/admin/page'); // User is not authenticated, redirect to login page
      }
    };


module.exports = {protected, guest, authenticate}