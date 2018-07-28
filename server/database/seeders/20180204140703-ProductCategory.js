'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProductCategory', [
      {
        id:1,
        Name: 'Phone',
        ImagePath:'cablephone_y2nwy6.jpg',
        createdAt:'2018-02-04',
        updatedAt:'2018-02-04'
      },
      {
        id:2,
        Name: 'Smart Phone',
        ParentCategoryId :1,
        ImagePath:'smartphone_utwhnq.jpg',
        createdAt:'2018-02-04',
        updatedAt:'2018-02-04'
      },
      {
        id:3,
        Name: 'Keypad Phone',
        ParentCategoryId :1,
        ImagePath:'keypadphone_q5e1y9.jpg',
        createdAt:'2018-02-04',
        updatedAt:'2018-02-04'
      },
      {
        id:4,
        Name: 'Phone Accessories',
        ParentCategoryId :1,
        ImagePath:'phoneaccessories_a6ye08.jpg',
        createdAt:'2018-02-04',
        updatedAt:'2018-02-04'
      }
  ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('ProductCategory', null, {});
    
  }
};
