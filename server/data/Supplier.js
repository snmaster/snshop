import db from '../models/index';
import {property} from 'lodash';
import cloudinary from '../cloudinary';
import PaginationHelper from  '../database/PaginationHelper';

export const type=`
    type Supplier{
        id:Int!
        Name:String!
        CompanyName:String!
        Image:String
        Thumb:String
        PhoneNo:String
        Email:String
        Township:Township
        UserAccount:UserAccount
        Address:String
    }
    type SupplierMutationResult{
        instance:Supplier
        errors:[error]
    }

    type Suppliers{
        page:Int!
        pageSize:Int!
        totalRows:Int!
        hasMore:Boolean!
        Supplier:[Supplier]
    }

    input InputSupplier{
        id:Int
        Name:String!
        CompanyName:String!
        ImagePath:String
        PhoneNo:String
        Email:String
        TownshipId:Int
        UserAccountId:Int
        Address:String
    }
`;
export const query=`
    Supplier:[Supplier]
`;


export const  mutation=`   
    createSupplier(Supplier:InputSupplier):SupplierMutationResult
    deleteSupplier(id:Int):Supplier
`;

export const resolver={

    type:{
        Supplier:{
            id:property('id'),
            Name:property('Name'),
            CompanyName:property('CompanyName'),
            PhoneNo:property('PhoneNo'),
            Email:property('Email'),
            Address:property('Address'),
            Township(supplier){
                return supplier.getTownship();
            },
            UserAccount(supplier){
                return supplier.getUserAccount();
            },
            Image(spplier){
                return spplier.ImagePath ? cloudinary.url(spplier.ImagePath):``;
            },
            Thumb(spplier){
                return spplier.ImagePath ? cloudinary.thumb(spplier.ImagePath):``;
            }         
        }
    },
    query:{
        Supplier(_,{}){
			return db.Supplier.findAll();
		},
    },
    mutation:{
        createSupplier(_,{Supplier}){
            return db.sequelize.transaction().then(t=>{
                return db.Supplier.create(Supplier,{fields:['Name','CompanyName','ImagePath','PhoneNo','Address','UserAccountId','TownshipId'],transaction:t})
                .then(Supplier=>{
                    return {instance:Supplier};
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
        deleteSupplier(_,{id}){
            return db.sequelize.transaction((t)=>{
                return db.Supplier.destroy({where:{id:id},transaction:t})
                .then((rowsDeleted)=>{
                    if(rowsDeleted>0)
                        return db.Supplier.findById(id,{paranoid:false,transaction:t}).
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