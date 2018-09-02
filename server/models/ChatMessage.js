module.exports=(sequelize,DataTypes)=>{
    var ChatMessage = sequelize.define('ChatMessage',{
        content:{
            type:DataTypes.STRING(500)
        }
    },{
        classMethods:{
            associate:models=>{
                ChatMessage.belongsTo(models.UserAccount,{as:'Sender',foreignKey:'SenderId'});
                ChatMessage.belongsTo(models.UserAccount,{as:'Receiver',foreignKey:'ReceiverId'});
            }
        }
    });

    return ChatMessage;
}