import db from '../models/index';
import {property} from 'lodash';
import cloudinary from '../cloudinary';

export const type=`
    type ProductGroup{
        id:Int!
        Name:String!
        Image:String
        Thumb:String
    }
    type ProductGroupMutationResult{
        instance:ProductGroup
        errors:[error]
    }

    input InputProductGroup{
        id:Int
        Name:String!
        ImagePath:String        
    }
`;
export const query=`
    ProductGroup:[ProductGroup]
`;


export const  mutation=`   
    ProductGroup(productGroup:InputProductGroup):ProductGroupMutationResult
    deleteProductGroup(id:Int):ProductGroup
`;

export const resolver={

    type:{
        ProductGroup:{
            id:property('id'),
            Name:property('Name'),
            Image(group){
                return group.ImagePath ? cloudinary.url(group.ImagePath):``;
            },
            Thumb(group){
                return group.ImagePath ? cloudinary.thumb(group.ImagePath):``;
            }         
        }
    },
    query:{
        ProductGroup(_,{}){
            return db.ProductGroup.findAll();
        },
    },
    mutation:{
        ProductGroup(_,{productGroup}){
            let {id,Name,ImagePath} = productGroup;
            return db.sequelize.transaction((t)=>{
                return db.ProductGroup.findOrCreate({where: {id: id}, defaults: { Name,ImagePath},transaction:t})
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
        deleteProductGroup(_,{id}){
            return db.sequelize.transaction((t)=>{
                return db.ProductGroup.destroy({where:{id:id},transaction:t})
                .then((rowsDeleted)=>{
                    if(rowsDeleted>0)
                        return db.ProductGroup.findById(id,{paranoid:false,transaction:t}).
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