
module.exports=(sequelize,DataTypes)=>{
    var UserAccount = sequelize.define('UserAccount',{
        UserName:{
            type:DataTypes.STRING(50),
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'Name is required'
                },
                len:{
                    args:[[0,100]],
                    msg:'Need to be less than 50 char.'
                }
            }
        },
        PhoneNo:DataTypes.STRING(20),
        FullName:DataTypes.STRING(50),
        facebookId:DataTypes.STRING(20),
        AccountKitId:DataTypes.STRING(20),
        Password:DataTypes.STRING(100),
        AccountType:DataTypes.STRING(10)
    },{
        paranoid:true
    });
    return UserAccount;
};