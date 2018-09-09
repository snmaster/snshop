import db from '../models/index';
import {property} from 'lodash';
import cloudinary from '../cloudinary';

export const type=`
    type UserAccount{
        id:Int!
        UserName:String!
        Password:String
        facebookId:String
        AccountKitId:String
        PhoneNo:String
        FullName:String
        AccountType:String
    }
    type UserAccountMutationResult{
        instance:UserAccount
        errors:[error]
    }

    input InputUserAccount{
        id:Int
        UserName:String!
        Password:String!      
        AccountType:String  
    }
`;
export const query=`
    UserAccount:[UserAccount]
    UserAccountById(id:Int!):UserAccount
`;


export const  mutation=`   
    UserAccount(UserAccount:InputUserAccount):UserAccountMutationResult
    deleteUserAccount(id:Int):UserAccount
`;

export const resolver={

    type:{
        UserAccount:{
            id:property('id'),
            UserName:property('UserName'),
            Password:property('Password'),
            PhoneNo:property('PhoneNo'),
            FullName:property('FullName'),
            facebookId:property('facebookId'),
            AccountKitId:property('AccountKitId'),         
            AccountType:property('AccountType')    
        }
    },
    query:{
        UserAccount(_,{}){
            return db.UserAccount.findAll();
        },
        UserAccountById(_,{id}){
            return db.UserAccount.findById(id);
        }
    },
    mutation:{
        UserAccount(_,{UserAccount}){
            let {id,UserName,Password,FullName,facebookId,AccountType} = UserAccount;
            return db.sequelize.transaction((t)=>{
                return db.UserAccount.findOrCreate({where: {id: id}, defaults: { UserName,Password,FullName,facebookId,AccountType},transaction:t})
                    .spread((instance, created) => {
                        if(created)
                            return {instance};
                        else{
                            return instance.update({UserName,Password,FullName,facebookId,AccountType},{transaction:t,fields:['UserName','Password','FullName','facebookId','AccountType']}).then((instance)=>({instance}));
                        }
                    });
            }).catch((error)=>{
                if(error.errors)
                    return new Promise((resolve)=>{resolve({instance:null,errors:error.errors.map(e=>({key:e.path,message:e.message}))});})
                else
                    return error;
            });

        },
        deleteUserAccount(_,{id}){
            return db.sequelize.transaction((t)=>{
                return db.UserAccount.destroy({where:{id:id},transaction:t})
                .then((rowsDeleted)=>{
                    if(rowsDeleted>0)
                        return {id};
                    else
                        return null;
                });
            });
        }
    }
};