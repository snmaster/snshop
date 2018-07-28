"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("Product", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            Code: {
                type: Sequelize.STRING(10),
                unique: true
            },
            Alias: {
                type: Sequelize.STRING(100)
            },
            Name: {
              type: Sequelize.STRING(255)
            },
            Description: {
              type: Sequelize.STRING(500)
            },
            ImagePath: {
                type: Sequelize.STRING(50)
            },
            ProductGroupId:{
              type:Sequelize.INTEGER,
              references:{
                model:'ProductGroup',
                key:'id'
              }
            },
            ProductCategoryId:{
              type:Sequelize.INTEGER,
              references:{
                model:'ProductCategory',
                key:'id'
              }
            },
            ProductBrandId:{
              type:Sequelize.INTEGER,
              references:{
                model:'ProductBrand',
                key:'id'
              }
            },
            UOMId:{
              type:Sequelize.INTEGER,
              references:{
                model:'UOM',
                key:'id'
              }
            },
            SupplierId:{
              type:Sequelize.INTEGER,
              references:{
                model:'Supplier',
                key:'id'
              }
            },
            Price:{
              type:Sequelize.DECIMAL(14,2)
            },
            OrderedQty:{
              type:Sequelize.INTEGER
            },
            ReservedQty:{
              type:Sequelize.INTEGER
            },
            MaxOrderQty:{
              type:Sequelize.INTEGER
            },
            ActualBalance:{
              type:Sequelize.INTEGER
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            deletedAt: Sequelize.DATE
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable("Product");
    }
};

