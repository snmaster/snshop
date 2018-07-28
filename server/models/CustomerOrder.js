module.exports=(sequelize,DataTypes)=>{
    var CustomerOrder=sequelize.define('CustomerOrder',{
        OrderNo:{
            type: DataTypes.STRING(20),
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'OrderNo is required'
                },
                len:{
                    args:[[0,20]],
                    msg:'Need to be less than 20 char.'
                }
            }
        },
        OrderDate:DataTypes.DATE,
        UserAccountId:DataTypes.INTEGER,
        ShippingAddress:DataTypes.STRING(500)
    },{
        paranoid:true,
        classMethods:{
            associate:(models)=>{
                CustomerOrder.belongsTo(models.UserAccount);
            }
        }
    });
    return CustomerOrder;
}