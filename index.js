const express= require('express')
const dotenv = require('dotenv')
const hbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const db = require('./models/index')

// Initial env variables
dotenv.config()
const app = express()

// Initialize express-json, express-session, connect-flash
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
  // store: new pgStore({
  //  pool: pool,
  //  tableName: 'user-session'
  // }),
  secret: 'xbitobmen',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

// Initialize view engine
app.engine('.hbs', hbs.engine({extname: '.hbs'}))
app.set('view engine', '.hbs')

// Initialize public folder in Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Initialize routes
app.use('/', require('./routes/user.routes'))
app.use('/', require('./routes/exchange.route'))
app.use('/', require('./routes/admin.routes'))

// PORT env variables
const PORT = process.env.PORT|| 3000

// connect to SERVER localhost:3000
const startProject = async (req,res) => {
  try {
    // connect to sequelize
    const connect = await db.sequelize.sync({force:true})
    // listen the PORT
    app.listen(PORT, (req,res) => {
        console.log(`Server is running on PORT ${PORT}`);
    })
  } catch (err) {
    console.log(err);
  }
}

startProject()