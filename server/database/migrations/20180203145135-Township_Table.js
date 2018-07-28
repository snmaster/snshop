"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("Township", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            Name: {
                type: Sequelize.STRING(100)
            },
            RegionId:{
              type:Sequelize.INTEGER,
              references:{
                model:'Region',
                key:'id'
              }
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            deletedAt: Sequelize.DATE
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable("Township");
    }
};