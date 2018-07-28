'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable("UserSession",{
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      SessionKey: {
        type: Sequelize.STRING(100)
      },
      ExpiredIn:{
        type: Sequelize.INTEGER
      },
      Counter:{
        type: Sequelize.INTEGER
      },
      UserAccountId:{
        type:Sequelize.INTEGER,
        references:{
          model:'UserAccount',
          key:'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable("UserSession");
  }
};
