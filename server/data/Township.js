import db from '../models/index';
import {property} from 'lodash';

import cloudinary from '../cloudinary';

export const type=`
    type Township{
        id:Int!
        Name:String!
        Region:Region
    }

    type TownshipMutationResult{
        instance:Township
        errors:[error]
    }

    input InputTownship{
        id:Int
        Name:String! 
        RegionId:Int    
    }
`;
export const query=`
    Township(RegionId:Int):[Township]
`;


export const  mutation=`   
    Township(Township:InputTownship):TownshipMutationResult
    deleteTownship(id:Int):Township
`;

export const resolver={

    type:{
        Township:{
            id:property('id'),
            Name:property('Name'),
            Region(township){
                return township.getRegion();
            }
        }
    },
    query:{
        Township(_,{RegionId}){
            return db.Township.findAll({where:{RegionId:RegionId}});
        },
    },
    mutation:{
        Township(_,{Township}){
            let {id,Name,RegionId} = Township;
            return db.sequelize.transaction((t)=>{
                return db.Township.findOrCreate({where: {id: id}, defaults: { Name,RegionId},transaction:t})
                    .spread((instance, created) => {
                        if(created)
                            return {instance};
                        else{
                            return instance.update({Name,RegionId},{transaction:t,fields:['Name','RegionId']}).then((instance)=>({instance}));
                        }
                    });
            }).catch((error)=>{
                if(error.errors)
                    return new Promise((resolve)=>{resolve({instance:null,errors:error.errors.map(e=>({key:e.path,message:e.message}))});})
                else
                    return error;
            });

        },
        deleteTownship(_,{id}){
            return db.sequelize.transaction((t)=>{
                return db.Township.destroy({where:{id:id},transaction:t})
                .then((rowsDeleted)=>{
                    if(rowsDeleted>0)
                        return db.Township.findById(id,{paranoid:false,transaction:t}).
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