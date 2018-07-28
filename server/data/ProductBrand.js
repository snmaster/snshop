import db from '../models/index';
import {property} from 'lodash';
import cloudinary from '../cloudinary';

export const type=`
    type ProductBrand{
        id:Int!
        Name:String!
        Image:String
        Thumb:String
    }
    type ProductBrandMutationResult{
        instance:ProductBrand
        errors:[error]
    }

    input InputProductBrand{
        id:Int
        Name:String!
        ImagePath:String        
    }
`;
export const query=`
    ProductBrand:[ProductBrand]
`;


export const  mutation=`   
    ProductBrand(ProductBrand:InputProductBrand):ProductBrandMutationResult
    deleteProductBrand(id:Int):ProductBrand
`;

export const resolver={

    type:{
        ProductBrand:{
            id:property('id'),
            Name:property('Name'),
            Image(brand){
                return brand.ImagePath ? cloudinary.url(brand.ImagePath):``;
            },
            Thumb(brand){
                return brand.ImagePath ? cloudinary.thumb(brand.ImagePath):``;
            }         
        }
    },
    query:{
        ProductBrand(_,{}){
            return db.ProductBrand.findAll();
        },
    },
    mutation:{
        ProductBrand(_,{ProductBrand}){
            let {id,Name,ImagePath} = ProductBrand;
            return db.sequelize.transaction((t)=>{
                return db.ProductBrand.findOrCreate({where: {id: id}, defaults: { Name,ImagePath},transaction:t})
                    .spread((instance, created) => {
                        if(created)
                            return {instance};
                        else{
                            return instance.update({Name,ImagePath},{transaction:t,fields:['Name','ImagePath']}).then((instance)=>({instance}));
                        }
                    });
            }).catch((error)=>{
                if(error.errors)
                    return new Promise((resolve)=>{resolve({instance:null,errors:error.errors.map(e=>({key:e.path,message:e.message}))});})
                else
                    return error;
            });

        },
        deleteProductBrand(_,{id}){
            return db.sequelize.transaction((t)=>{
                return db.ProductBrand.destroy({where:{id:id},transaction:t})
                .then((rowsDeleted)=>{
                    if(rowsDeleted>0)
                        return db.ProductBrand.findById(id,{paranoid:false,transaction:t}).
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