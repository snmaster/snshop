'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("ChatMessage",{
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      SenderId:{
        type:Sequelize.INTEGER,
        references:{
          model:'UserAccount',
          key:'id'
        }
      },
      ReceiverId:{
        type:Sequelize.INTEGER,
        references:{
          model:'UserAccount',
          key:'id'
        }
      },
      content:{
        type:Sequelize.STRING(200)
      },        
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
      
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable("ChatMessage");
  }
};
