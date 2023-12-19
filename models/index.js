const Sequelize = require('sequelize')

const sequelize = new Sequelize('exc', 'postgres', 'aziz',{
    host: 'localhost',
    dialect: 'postgres'
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


db.user = require('./user.model')(sequelize, Sequelize)
db.exchange = require('./exchange.model')(sequelize, Sequelize)
db.change = require('./change.model')(sequelize,Sequelize)

module.exports = db