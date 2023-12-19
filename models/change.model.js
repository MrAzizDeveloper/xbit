module.exports = (sequelize, Sequelize) => {
    const Change = sequelize.define('change', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      text: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      text2: {
        type: Sequelize.STRING(500),
        allowNull: false
      },

      imageUrl: {
        type: Sequelize.STRING(1000),
        allowNull: true
      }
    }, {
      timestamps: true
    })
  
    return Change
  }