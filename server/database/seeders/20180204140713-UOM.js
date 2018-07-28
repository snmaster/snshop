'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UOM', [
      {
        id:1,
        Name: 'Bottle',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:2,
        Name: 'Tin',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:3,
        Name: 'Package',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:4,
        Name: 'Carton',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:5,
        Name: 'Box',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:6,
        Name:'Piece',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      }
    
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    
      return queryInterface.bulkDelete('UOM', null, {});
    
  }
};
