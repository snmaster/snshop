'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Township', [
      {
        id:1,
        Name: 'Bahan',
        RegionId:1,
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:2,
        Name: 'KyeeMyintTaing',
        RegionId:1,
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:3,
        Name: 'Along',
        RegionId:1,
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Township', null, {});    
  }
};
