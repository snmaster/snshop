'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('ProductBrand', [
        {
          id:1,
          Name: 'Samsung',
          createdAt:'2018-02-04',updatedAt:'2018-02-04'
        },
        {
          id:2,
          Name: 'Sony Errison',
          createdAt:'2018-02-04',updatedAt:'2018-02-04'
        },
        {
          id:3,
          Name: 'Nokia',
          createdAt:'2018-02-04',updatedAt:'2018-02-04'
        },
        {
          id:4,
          Name: 'Mi',
          createdAt:'2018-02-04',updatedAt:'2018-02-04'
        },
        {
          id:5,
          Name: 'Hauwei',
          createdAt:'2018-02-04',updatedAt:'2018-02-04'
        }
    ], {});  
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.bulkDelete('ProductBrand', null, {});
  
  }
};
