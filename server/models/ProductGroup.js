
module.exports=(sequelize,DataTypes)=>{
    var ProductGroup = sequelize.define('ProductGroup',{
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
        },
        ImagePath:DataTypes.STRING(255)
    },{
        paranoid:true
    });
    return ProductGroup;
};