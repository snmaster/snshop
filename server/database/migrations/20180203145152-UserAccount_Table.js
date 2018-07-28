"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("UserAccount", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            UserName: {
                type: Sequelize.STRING(50)
            },
            Password: {
              type: Sequelize.STRING(50)
            },
            PhoneNo: {
                type: Sequelize.STRING(20)
            },
            FullName: {
                type: Sequelize.STRING(50)
            },
            facebookId: {
                type: Sequelize.STRING(20)
            },
            AccountKitId: {
                type: Sequelize.STRING(20)
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            deletedAt: Sequelize.DATE
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable("UserAccount");
    }
};

