'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Supplier', [
      {
        id:1,
        Name: 'Kyaw Myo',
        CompanyName: 'Htoo Trading Company',
        TownshipId:2,
        UserAccountId:1,
        Address:'Ygn',
        PhoneNo:'09-34634645',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:2,
        Name: 'Kyaw San',
        CompanyName: 'Myint Oo Company',
        TownshipId:2,
        UserAccountId:2,
        Address:'Ygn',
        PhoneNo:'09-347456756',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Supplier', null, {});    
  }
};
