module.exports=(sequelize,DataTypes)=>{
    var CustomerOrderDetail=sequelize.define('CustomerOrderDetail',{
        Qty:DataTypes.INTEGER,
        Price:DataTypes.DECIMAL(14,2)        
    },{
        paranoid:true,
        classMethods:{
            associate:(models)=>{
                CustomerOrderDetail.belongsTo(models.Product);
                CustomerOrderDetail.belongsTo(models.CustomerOrder);
                models.CustomerOrder.hasMany(CustomerOrderDetail);
                models.Product.hasMany(CustomerOrderDetail);
            }
        }
    });
    return CustomerOrderDetail;
}