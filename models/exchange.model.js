module.exports = (sequelize, Sequelize)=>{

    const Exchange = sequelize.define('exchange', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING(255),
            allowNull: false
          },
        lastName:{
            type: Sequelize.STRING(255),
            allowNull: false
        },
        phone:{
            type: Sequelize.STRING(255),
            allowNull: false 
        },
        giveValue:{
            type: Sequelize.STRING(255),
            allowNull: false  
        },
        removeValue:{
            type: Sequelize.STRING(255),
            allowNull: false
        },
        giveValueCard:{
            type: Sequelize.STRING(255),
            allowNull: false 
        },
        removeValueCard:{
            type: Sequelize.STRING(255),
            allowNull: false 
        }
    }, {
        timestamps: true
    })

    return Exchange
}    
