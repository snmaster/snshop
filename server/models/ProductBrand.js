module.exports=(sequelize,DataTypes)=>{
    var ProductBrand = sequelize.define('ProductBrand',{
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
        ImagePath:DataTypes.STRING(255),
        PhotoFormat:DataTypes.STRING(10)
    },{
        paranoid:true
    });
    return ProductBrand;
};