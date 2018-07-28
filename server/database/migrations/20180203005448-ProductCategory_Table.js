"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("ProductCategory", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            Name: {
                type: Sequelize.STRING(100)
            },
            ImagePath: {
                type: Sequelize.STRING(50)
            },
            ParentCategoryId:{
              type:Sequelize.INTEGER,
              references:{
                model:'ProductCategory',
                key:'id'
              }
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            deletedAt: Sequelize.DATE
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable("ProductCategory");
    }
};