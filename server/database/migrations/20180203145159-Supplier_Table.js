"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("Supplier", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            Name: {
                type: Sequelize.STRING(100)
            },
            CompanyName: {
              type: Sequelize.STRING(255)
            },
            Address: {
              type: Sequelize.STRING(500)
            },
            ImagePath: {
                type: Sequelize.STRING(50)
            },
            PhoneNo: {
              type: Sequelize.STRING(50)
            },
            Email:{
              type: Sequelize.STRING(50)
            },
            TownshipId:{
              type:Sequelize.INTEGER,
              references:{
                model:'Township',
                key:'id'
              }
            },
            UserAccountId:{
              type:Sequelize.INTEGER,
              references:{
                model:'UserAccount',
                key:'id'
              }
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            deletedAt: Sequelize.DATE
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable("Supplier");
    }
};

