import db from '../models/index';
import {property} from 'lodash';
import cloudinary from '../cloudinary';

export const type=`
    type UOM{
        id:Int!
        Name:String!
    }
    type UOMMutationResult{
        instance:UOM
        errors:[error]
    }

    input InputUOM{
        id:Int
        Name:String!     
    }
`;
export const query=`
    UOM:[UOM]
`;


export const  mutation=`   
    UOM(UOM:InputUOM):UOMMutationResult
    deleteUOM(id:Int):UOM
`;

export const resolver={
    type:{
        UOM:{
            id:property('id'),
            Name:property('Name')
        }
    },
    query:{
        UOM(_,{}){
            return db.UOM.findAll();
        },
    },
    mutation:{
        UOM(_,{UOM}){
            let {id,Name} = UOM;
            return db.sequelize.transaction((t)=>{
                return db.UOM.findOrCreate({where: {id: id}, defaults: { Name},transaction:t})
                    .spread((instance, created) => {
                        if(created)
                            return {instance};
                        else{
                            return instance.update({Name},{transaction:t,fields:['Name']}).then((instance)=>({instance}));
                        }
                    });
            }).catch((error)=>{
                if(error.errors)
                    return new Promise((resolve)=>{resolve({instance:null,errors:error.errors.map(e=>({key:e.path,message:e.message}))});})
                else
                    return error;
            });

        },
        deleteUOM(_,{id}){
            return db.sequelize.transaction((t)=>{
                return db.UOM.destroy({where:{id:id},transaction:t})
                .then((rowsDeleted)=>{
                    if(rowsDeleted>0)
                        return db.UOM.findById(id,{paranoid:false,transaction:t}).
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