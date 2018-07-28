
module.exports=(sequelize,DataTypes)=>{
    var UserSession = sequelize.define('UserSession',{
        SessionKey:{
            type:DataTypes.STRING(100)
        },
        ExpiredIn:DataTypes.INTEGER,
        Counter:DataTypes.INTEGER
    },{       
        classMethods:{
            associate:(models)=>{
                UserSession.belongsTo(models.UserAccount);
                models.UserAccount.hasMany(UserSession);
            }
        }
    });

    return UserSession;
};