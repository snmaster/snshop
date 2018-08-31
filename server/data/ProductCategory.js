import db from '../models/index';
import {property} from 'lodash';
import PaginationHelper from  '../database/PaginationHelper';
import cloudinary from '../cloudinary';

export const type=`
    type ProductCategory{
        id:Int!
        Name:String!
        Image:String
        ParentCategoryId:Int
        Thumb:String
        SubCategories:[ProductCategory]
    }

    type ProductCategoryMutationResult{
        instance:ProductCategory
        errors:[error]
    }

    type ProductCategories{
        page:Int!
        pageSize:Int!
        totalRows:Int!
        hasMore:Boolean!
        ProductCategory:[ProductCategory]
    }

    input InputProductCategory{
        id:Int
        Name:String!
        ImagePath:String    
        ParentCategoryId:Int    
    }
`;
export const query=`
    searchCategoryByKeyWord(keyWord:String,limit:Int!):[ProductCategory]
    ProductCategory(parentCategoryId:Int,page:Int,pageSize:Int):[ProductCategory]
    CategoryList:[ProductCategory]
`;


export const  mutation=`   
    saveProductCategory(category:InputProductCategory):ProductCategoryMutationResult
    deleteProductCategory(id:Int!):ProductCategory
`;

export const resolver={

    type:{
        ProductCategory:{
            id:property('id'),
            Name:property('Name'),
            Image(group){
                return group.ImagePath ? cloudinary.url(group.ImagePath):``;
            },
            Thumb(group){
                return group.ImagePath ? cloudinary.thumb(group.ImagePath):``;
            },
            ParentCategoryId:property('ParentCategoryId'),
            SubCategories:(category)=>{
                return category.ChildCategory;
            }
        }
    },
    query:{
        // ProductCategory(_,{parentCategoryId}){
        //     return db.ProductCategory.findAll({where:{ParentCategoryId:parentCategoryId}});
        // },
        ProductCategory(_,{parentCategoryId,page,pageSize}){			
            page = page? page: 1;
            let where = true;
            if(parentCategoryId)
                where = {ParentCategoryId:parentCategoryId};
            return db.ProductCategory.findAll({where:{ParentCategoryId:null},include:[{model:db.ProductCategory,as:'ChildCategory',include:[{model:db.ProductCategory,as:'ChildCategory'}]}]});
			//return PaginationHelper.getResult({db,baseQuery:db.ProductCategory,page,pageSize,where,listKey:'ProductCategory',paranoid:false});
        },
        searchCategoryByKeyWord(_,{keyWord,limit}){
            keyWord = '%' + keyWord + '%'
            const where={
                $or: keyWord ==='%' ? true: {
                    Name:{
                        $ilike:keyWord
                    }
                }
            };
			return db.ProductCategory.findAll({where,limit,order:['Name']});
        },
        CategoryList(_,{}){
            return db.ProductCategory.findAll();
        }
    },
    mutation:{
        saveProductCategory(_,{category}){
            let {id,Name,ImagePath,ParentCategoryId} = category;
            return db.sequelize.transaction((t)=>{
                return db.ProductCategory.findOrCreate({where:{id}, defaults: { Name,ImagePath,ParentCategoryId},transaction:t})
                    .spread((instance, created) => {
                        if(created)
                            return {instance};
                        else{
                            return instance.update({Name,ImagePath,ParentCategoryId},{transaction:t,fields:['Name','ImagePath','ParentCategoryId']}).then((instance)=>({instance}));
                        }
                    });
            }).catch((error)=>{
                if(error.errors)
                    return new Promise((resolve)=>{resolve({instance:null,errors:error.errors.map(e=>({key:e.path,message:e.message}))});})
                else
                    return error;
            });

        },
        deleteProductCategory(_,{id}){
            return db.sequelize.transaction((t)=>{
                return db.ProductCategory.destroy({where:{id:id},transaction:t})
                .then((rowsDeleted)=>{
                    if(rowsDeleted>0)
                        return db.ProductCategory.findById(id,{paranoid:false,transaction:t}).
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