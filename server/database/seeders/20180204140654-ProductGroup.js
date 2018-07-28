'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('ProductGroup', [
      {
        id:1,
        Name: 'Fancy',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:2,
        Name: 'Personal Used',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      }
  ], {});
  
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.bulkDelete('ProductGroup', null, {});
  }
};
