'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
return queryInterface.bulkInsert('Product', [
  {
    id:1,
    Alias: 'Samsung Galaxy S5',
    Name: 'Samsung Galaxy S5',
    Description: 'Samsung Galaxy S5',
    ProductGroupId:2,
    ProductCategoryId:2,
    ProductBrandId:1,
    ImagePath:'galaxy_s5_iulzid.jpg',
    UOMId:6,
    SupplierId:2,
    Price:500000,
    createdAt:'2018-02-04',updatedAt:'2018-02-04'
  },
  {
    id:2,
    Alias: 'M5',
    Name: 'Hauwei M5',
    Description: 'Hauwei 5',
    ProductGroupId:2,
    ProductCategoryId:2,
    ProductBrandId:5,
    ImagePath:'mi5_njlqlj.jpg',
    UOMId:6,
    SupplierId:1,
    Price:400000,
    createdAt:'2018-02-04',updatedAt:'2018-02-04'
  }
], {});

  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Product', null, {});
    
  }
};
