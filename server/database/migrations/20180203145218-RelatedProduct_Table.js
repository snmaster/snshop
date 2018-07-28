"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("RelatedProduct", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            ProductId:{
              type:Sequelize.INTEGER,
              references:{
                model:'Product',
                key:'id'
              }
            },
            RelatedProductId:{
              type:Sequelize.INTEGER,
              references:{
                model:'Product',
                key:'id'
              }
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            deletedAt: Sequelize.DATE
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable("RelatedProduct");
    }
};

