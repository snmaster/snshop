'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('UserAccount','AccountType',{
      type:Sequelize.STRING(10)
    })
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.removeColumn('UserAccount','AccountType');
  }
};
