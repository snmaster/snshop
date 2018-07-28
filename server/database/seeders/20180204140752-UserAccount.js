'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserAccount', [
      {
        id:1,
        UserName: 'kyaw',
        Password:'san',
        PhoneNo:'09797525977',
        FullName:'Kyaw San Oo',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      },
      {
        id:2,
        UserName: 'aung',
        Password:'aung',
        PhoneNo:'',
        createdAt:'2018-02-04',updatedAt:'2018-02-04'
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('UserAccount', null, {});
    
  }
};
