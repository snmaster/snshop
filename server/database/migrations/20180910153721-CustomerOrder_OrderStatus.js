'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('CustomerOrder','OrderStatus',{
      type:Sequelize.STRING(10)
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('CustomerOrder','OrderStatus');
  }
};
