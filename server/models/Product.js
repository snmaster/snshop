module.exports=(sequelize,DataTypes)=>{
    var Product=sequelize.define('Product',{
        Alias:{
            type: DataTypes.STRING(100),
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'Alias is required'
                },
                len:{
                    args:[[0,50]],
                    msg:'Need to be less than 50 char.'
                }
            }
        },
        Name:{
            type:DataTypes.STRING(250),
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'Name is required'
                },
                len:{
                    args:[[0,250]],
                    msg:'Need to be less than 250 char.'
                }
            }
        },
        ImagePath:DataTypes.STRING(255),
        Price:DataTypes.DECIMAL(14,2),
        Description:DataTypes.TEXT,
        OrderedQty:DataTypes.INTEGER,
        ReservedQty:DataTypes.INTEGER,
        MaxOrderQty:DataTypes.INTEGER,
        ActualBalance:DataTypes.INTEGER
    },{
        paranoid:true,
        classMethods:{
            associate:(models)=>{
                Product.belongsTo(models.ProductCategory);
                Product.belongsTo(models.ProductGroup);
                Product.belongsTo(models.ProductBrand);
                Product.belongsTo(models.UOM);
                Product.belongsTo(models.Supplier);
                Product.belongsToMany(Product,{
                    as:"RelatedProducts",
                    through:"RelatedProduct",
                    foreignKey:"ProductId"
                });
                Product.belongsToMany(Product,{
                    as :"ProductsInRelationship",
                    through:"RelatedProduct",
                    foreignKey:"RelatedProductId"
                });
            }
        }
    });
    return Product;
}