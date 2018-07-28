module.exports=(sequelize,DataTypes)=>{
    var Supplier=sequelize.define('Supplier',{
        Name:{
            type: DataTypes.STRING(100),
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'Name is required'
                },
                len:{
                    args:[[0,50]],
                    msg:'Name to be less than 50 char.'
                }
            }
        },
        CompanyName:{
            type:DataTypes.STRING(250),
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'CompanyName is required'
                },
                len:{
                    args:[[0,250]],
                    msg:'CompanyName to be less than 250 char.'
                }
            }
        },
        ImagePath:DataTypes.STRING(255),
        PhoneNo:DataTypes.STRING(50),
        Email:DataTypes.STRING(50),
        Address:DataTypes.TEXT
    },{
        paranoid:true,
        classMethods:{
            associate:(models)=>{
                Supplier.belongsTo(models.Township);
                Supplier.belongsTo(models.UserAccount);
            }
        }
    });
    return Supplier;
}