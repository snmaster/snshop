import db from '../models/index';
import {property} from 'lodash';
import cloudinary from '../cloudinary';
import PaginationHelper from  '../database/PaginationHelper';
import ProductCategory from '../../client/site/apollo/ProductCategory';

export const type=`
    type Product{
        id:Int!
        Alias:String!
        Name:String!
        Price:Float!
        Description:String!
        UOM:UOM
        ProductGroup:ProductGroup
        ProductBrand:ProductBrand
        ProductCategory:ProductCategory
        
        UserAccount:UserAccount
        Image:String
        Thumb:String
        OrderedQty:Int,
        ReservedQty:Int,
        MaxOrderQty:Int,
        ActualBalance:Int
    }
    type ProductMutationResult{
        instance:Product
        errors:[error]
    }

    type Products{
        page:Int!
        pageSize:Int!
        totalRows:Int!
        hasMore:Boolean!
        Product:[Product]
    }

    input InputProduct{
        id:Int!
        Alias:String!
        Name:String!
        Price:Float!
        Description:String!
        SupplierId:Int
        ImagePath:String
        UOMId:Int!
        ProductGroupId:Int
        ProductCategoryId:Int!
        ProductBrandId:Int!
    }
`;
export const query=`
    searchProductByKeyWord(keyWord:String,limit:Int!):[Product]
    Product(productCategoryId:Int,brandId:Int,minAmount:Float,maxAmount:Float,sortOrder:String,page:Int,pageSize:Int,search:String):Products
    ProductById(id:Int!):Product
`;


export const  mutation=`   
    createProduct(Product:InputProduct):ProductMutationResult
    deleteProduct(id:Int):Product
`;

export const resolver={

    type:{
        Product:{
            id:property('id'),
            Alias:property('Alias'),
            Name:property('Name'),
            Description:property('Description'),
            Price:property('Price'),
            UOM(product){
                return product.getUOM();
            },
            ProductGroup(product){
                return product.getProductGroup();
            },
            ProductBrand(product){
                return product.getProductBrand();
            },
            ProductCategory(product){
                return product.getProductCategory();
            },
            // Supplier(product){
            //     return product.getSupplier();
            // },
            UserAccount(product){
                return product.getUserAccount();
            },
            Image(brand){
                return brand.ImagePath ? cloudinary.url(brand.ImagePath):``;
            },
            Thumb(brand){
                return brand.ImagePath ? cloudinary.thumb(brand.ImagePath):``;
            }         
        }
    },
    query:{
        searchProductByKeyWord(_,{keyWord,limit}){
            keyWord = '%' + keyWord + '%'
            const where={
                $or: keyWord ==='%' ? true: {
                    Alias:{
                        $ilike:keyWord
                    },
                    Name:{
                        $ilike:keyWord
                    }
                }
            };
			return db.Product.findAll({where,limit,order:['Alias','Name']});
        },
        ProductById(_,{id}){
            return db.Product.findById(id);
        },
        Product(_,{productCategoryId,page,pageSize,search,brandId,minAmount,maxAmount,sortOrder}){
            search = '%' + search + '%';
            page = page? page: 1;
            let order={};
            if(sortOrder && sortOrder === "priceASC")
                order = [['Price','ASC']];
            else
                order = [['Price','DESC']];

            let where = {};
            if(productCategoryId && brandId)
                where = {
                    $and:{
                        $or: search ==='%' ? true: {
                            Alias:{
                                $ilike:search
                            },
                            Name:{
                                $ilike:search
                            }
                        },
                        ProductCategoryId:productCategoryId,
                        ProductBrandId:brandId,
                        Price:{
                            $between:[minAmount,maxAmount]
                        }
                    }
                };
            if(!productCategoryId && brandId)
                where = {
                    $and:{
                        $or: search ==='%' ? true: {
                            Alias:{
                                $like:search
                            },
                            Name:{
                                $like:search
                            }
                        },
                        ProductBrandId:brandId,
                        Price:{
                            $between:[minAmount,maxAmount]
                        }
                    }
                };
            if(productCategoryId && !brandId)
                where = {
                    $and:{
                        $or: search ==='%' ? true: {
                            Alias:{
                                $like:search
                            },
                            Name:{
                                $like:search
                            }
                        },
                        ProductCategoryId:productCategoryId,
                        Price:{
                            $between:[minAmount,maxAmount]
                        }
                    }
                }; 
            if(!productCategoryId && !brandId)
                where = {
                    $and:{
                        $or: search ==='%' ? true: {
                            Alias:{
                                $like:search
                            },
                            Name:{
                                $like:search
                            }
                        },
                        Price:{
                            $between:[minAmount,maxAmount]
                        }
                    }
                };  
			return PaginationHelper.getResult({db,baseQuery:db.Product,page,pageSize,where,order,listKey:'Product',paranoid:false});
		},

        // Product(_,{productCategoryId,criteria}){
		// 	let {pagination,orderBy} = criteria? criteria:{};
		// 	let {page,pageSize} = pagination? pagination:{page:1,pageSize:10};
		// 	page = page? page: 1;
        //     let where = true;
        //     if(productCategoryId)
        //         where = {ProductCategoryId:productCategoryId};
		// 	return PaginationHelper.getResult({db,baseQuery:db.Product,page,pageSize,where,listKey:'Product',paranoid:false,order:orderBy});
		// },
    },
    mutation:{
        createProduct(_,{product}){
            return db.sequelize.transaction().then(t=>{
                return db.Product.create(product,{fields:['Alias','Name','Price','Description','SupplierId','ProductGroupId','ProductCategoryId','UOMId','ProductBrandId'],transaction:t})
                .then(product=>{
                    return {instance:product};
                })
                .catch(error=>{
                    t.rollback();
                    if(error.errors)
                            return new Promise((resolve)=>{resolve({instance:null,errors:error.errors.map(e=>({key:e.path,message:e.message}))});});
                        else
                            throw error;
                });
            });

        },
        deleteProduct(_,{id}){
            return db.sequelize.transaction((t)=>{
                return db.Product.destroy({where:{id:id},transaction:t})
                .then((rowsDeleted)=>{
                    if(rowsDeleted>0)
                        return db.Product.findById(id,{paranoid:false,transaction:t}).
                            then((result)=>{
                                return result;
                            });
                    else
                        return null;
                });
            });
        }
    }
};