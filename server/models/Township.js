module.exports=(sequelize,DataTypes)=>{
    var Township = sequelize.define('Township',{
        Name:{
            type:DataTypes.STRING(100),
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'Name is required'
                },
                len:{
                    args:[[0,100]],
                    msg:'Need to be less than 100 char.'
                }
            }
        }
    },{
        paranoid:true,        
        classMethods:{
            associate:(models)=>{
                Township.belongsTo(models.Region);
            }
        }
    });
    return Township;
};