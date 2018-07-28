
module.exports=(sequelize,DataTypes)=>{
    var ProductCategory = sequelize.define('ProductCategory',{
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
        ImagePath:DataTypes.STRING(100)
    },{
        paranoid:true,
        classMethods:{
            associate:(models)=>{
                ProductCategory.belongsTo(models.ProductCategory,{as:'ParentCategory',foreignKey:'ParentCategoryId'});
                ProductCategory.hasMany(models.ProductCategory,{as:'ChildCategory',foreignKey:'ParentCategoryId'});
            }
        }
    });
    return ProductCategory;
};