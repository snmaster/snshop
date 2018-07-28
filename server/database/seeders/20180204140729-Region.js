'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Region', [
      {
        id:1,
        Name: 'Yangon',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:2,
        Name: 'Mandalay',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:3,
        Name: 'Pathein',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:4,
        Name: 'Sittwe',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      }
    ], {});
    
  },

  down: function (queryInterface, Sequelize) {
    
      return queryInterface.bulkDelete('Region', null, {});
    
  }
};
