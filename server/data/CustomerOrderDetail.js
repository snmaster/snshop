import db from '../models/index';
import {property} from 'lodash';
import PaginationHelper from  '../database/PaginationHelper';

export const type=`
    type CustomerOrderDetail{
        id:Int!
        CustomerOrderId:Int!
        Product:Product
        Qty:Int!
        Price:Float
    }

    input InputCustomerOrderDetail{
        ProductId:Int!
        Qty:Int!
        Price:Float!
    }

`;

export const query=`
`;

export const mutation=`
`;

export const resolver ={
    type :{
        CustomerOrderDetail:{
            id:property('id'),
            CustomerOrderId:property('CustomerOrderId'),
            Product:(order)=>{
                return order.getProduct();
            },
            Qty:property('Qty'),
            Price:property('Price')
        }
    },
    query :{
    },
    mutation:{

    }
}
