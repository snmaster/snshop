'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('CustomerOrder',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: Sequelize.DATE,
      OrderDate:{
        type:Sequelize.DATEONLY,
        allowNull:false
      },
      OrderNo:{
        type:Sequelize.STRING(20),
        allowNull:false
      },
      UserAccountId:{
        type:Sequelize.INTEGER,
        references:{
          model:'UserAccount',
          key:'id'
        }
      },
      ShippingAddress:{
        type:Sequelize.STRING(500),
        allowNull:false
      }
    });

    queryInterface.createTable('CustomerOrderDetail',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: Sequelize.DATE,
      CustomerOrderId:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      ProductId:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      Qty:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      Price:{
        type:Sequelize.DECIMAL(14,2),
        allowNull:false
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable("CustomerOrderDetail");
    queryInterface.dropTable("CustomerOrder");
  }
};
