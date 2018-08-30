'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('CustomerOrder','ShippingCost',{
      type:Sequelize.DECIMAL(14,2)
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('CustomerOrder','ShippingCost');
  }
};
