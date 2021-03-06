import db from '../models/index';
import {property} from 'lodash';
import PaginationHelper from  '../database/PaginationHelper';

export const type=`
    type CustomerOrder{
        id:Int!
        OrderDate:Date!
        OrderNo:String!
        UserAccountId:Int!
        Customer:UserAccount
        ShippingAddress:String
        ShippingCost:Float
        TotalAmount:Float
        TotalQty:Int
        OrderStatus:String
        detail:[CustomerOrderDetail]
    }

    type CustomerOrderMutationResult{
        instance:CustomerOrder
        errors:[error]
    }

    type CustomerOrders{
        page:Int!
        pageSize:Int!
        hasMore:Boolean!
        totalRows:Int!
        CustomerOrder : [CustomerOrder]
    }

    input InputCustomerOrder{
        id:Int
        OrderDate:Date
        OrderNo:String
        UserAccountId:Int
        ShippingAddress:String
        ShippingCost:Float
        OrderStatus:String
        detail:[InputCustomerOrderDetail]
    }
`;

export const query=`
    CustomerOrder(customerId:Int,page:Int!,pageSize:Int):CustomerOrders
    customerOrderById(id:Int!,customerId:Int):CustomerOrder
`;

export const mutation=`
    createCustomerOrder(order:InputCustomerOrder):CustomerOrderMutationResult
    deleteCustomerOrder(id:Int!):CustomerOrder
`;

export const resolver ={
    type :{
        CustomerOrder:{
            id:property('id'),
            OrderDate:property('OrderDate'),
            OrderNo:property('OrderNo'),
            UserAccountId:property('UserAccountId'),
            Customer:(order)=>{
                return order.getUserAccount();
            },
            ShippingAddress:property('ShippingAddress'),
            ShippingCost:property('ShippingCost'),
            TotalAmount:(order)=>{
				return db.CustomerOrderDetail.findAll({raw:true,where:{CustomerOrderId:order.id},attributes:[[db.sequelize.fn('SUM', db.sequelize.literal('"Qty" * "Price"')),'TotalAmount']]})
				.then(result=>(result.length>0? Number(result[0].TotalAmount)+Number(order.ShippingCost ? order.ShippingCost : 0):0));
            },
            TotalQty:(order)=>{
				return db.CustomerOrderDetail.findAll({raw:true,where:{CustomerOrderId:order.id},attributes:[[db.sequelize.fn('SUM', db.sequelize.literal('"Qty"')),'TotalQty']]})
				.then(result=>(result.length>0? Number(result[0].TotalQty):0));
            },
            OrderStatus:property('OrderStatus'),
            detail:(order)=>{
                return order.getCustomerOrderDetails();
            }
        }
    },
    query :{
        CustomerOrder(_,{customerId,page,pageSize}){
            let where = true;
            if(customerId)where ={UserAccountId:customerId};
			page = page? page: 1;
			return PaginationHelper.getResult({db,baseQuery:db.CustomerOrder,where,page,pageSize,listKey:'CustomerOrder',paranoid:false});
        },
        customerOrderById(_,{id,customerId}){
            return db.CustomerOrder.findById(id);
        }
    },
    mutation:{
        createCustomerOrder(_,{order}){
            let {UserAccountId,ShippingAddress,ShippingCost,OrderStatus,detail} = order;
            return db.sequelize.transaction(t=>{
                return db.CustomerOrder.create({OrderDate:new Date(),OrderNo:(new Date()).uniqueNumber(),UserAccountId,ShippingCost,ShippingAddress,OrderStatus},{fields:['OrderDate','OrderNo','UserAccountId','ShippingCost','ShippingAddress','OrderStatus'],transaction:t})
                     .then(customerOrder=>{
                         let promises =detail.map(({ProductId,Qty,Price})=>{
                             return customerOrder.createCustomerOrderDetail({ProductId,Qty,Price},{fields:['ProductId','Qty','Price'],transaction:t})
                         });

                         return Promise.all(promises).then(result=>({instance:customerOrder}));

                     });
            });
            
        },
        deleteCustomerOrder(_,{id}){
            return db.sequelize.transaction(t=>{
                return db.CustomerOrder.findById(id,{transaction:t})
                     .then(customerOrder=>{
                        return db.CustomerOrderDetail.destroy({where:{CustomerOrderId:id},transaction:t}).then(()=>{
                            return db.CustomerOrder.destroy({where:{id:id},transaction:t});
                        }).then(()=>{
                            return db.CustomerOrder.findById(id,{transaction:t});
                        })
                     });
            });
        }
    }
}
