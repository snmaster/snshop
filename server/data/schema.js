/**
 * Created by ChitSwe on 12/21/16.
 */
//import {type as type_CustomerOrderShipment,query as query_CustomerOrderShipment,mutation as mutation_CustomerOrderShipment} from './CustomerOrderShipment';
import {type as type_ProductGroup,query as query_ProductGroup,mutation as mutation_ProductGroup, mutation} from './ProductGroup';
import {type as type_ProductBrand,query as query_ProductBrand,mutation as mutation_ProductBrand} from './ProductBrand';
import {type as type_ProductCategory,query as query_ProductCategory,mutation as mutation_ProductCategory} from './ProductCategory';
import {type as type_Product,query as query_Product,mutation as mutation_Product, query} from './Product';
import {type as type_UOM,query as query_UOM,mutation as mutation_UOM} from './UOM';
import {type as type_Supplier,query as query_Supplier,mutation as mutation_Supplier} from './Supplier';
import {type as type_UserAccount,query as query_UserAccount,mutation as mutation_UserAccount} from './UserAccount';
import {type as type_Township,query as query_Township,mutation as mutation_Township} from './Township';
import {type as type_Region,query as query_Region,mutation as mutation_Region} from './Region';
import {type as type_CustomerOrder,query as query_CustomerOrder,mutation as mutation_CustomerOrder} from './CustomerOrder';
import {type as type_CustomerOrderDetail,query as query_CustomerOrderDetail,mutation as mutation_CustomerOrderDetail} from './CustomerOrderDetail';
import {type as type_ChatMessage,query as query_ChatMessage,mutation as mutation_ChatMessage,subscription as subscription_ChatMessage} from './ChatMessage';
const Schema=`
    scalar DateTime
    scalar Date
    
    type error{
        key:String
        message:String!
    }

    type pagination{
        page:Int!
        pageSize:Int!
        hasMore:Boolean!
        totalRows:Int!
        totalPages:Int!
    }

    input paginationCriteria{
        page:Int!
        pageSize:Int!
    }

    input criteria{
        pagination:paginationCriteria!
        orderBy:[[String]]!
    }

    input DateRange{
        From:Date
        To:Date
    }

  
    ${type_ProductGroup}
    ${type_ProductCategory}
    ${type_ProductBrand}
    ${type_Product}
    ${type_UOM}
    ${type_Supplier}
    ${type_UserAccount}
    ${type_Township}
    ${type_Region}
    ${type_CustomerOrder}
    ${type_CustomerOrderDetail}
    ${type_ChatMessage}

    type Query{
        ${query_ProductGroup}
        ${query_ProductBrand}
        ${query_Product}
        ${query_ProductCategory}
        ${query_UOM}
        ${query_Supplier}
        ${query_UserAccount}
        ${query_Township}
        ${query_Region}
        ${query_CustomerOrder}
        ${query_CustomerOrderDetail}
        ${query_ChatMessage}
    }
    
    type Mutation{
        ${mutation_ProductGroup}
        ${mutation_ProductBrand}
        ${mutation_ProductCategory}
        ${mutation_Product}
        ${mutation_UOM}
        ${mutation_Supplier}
        ${mutation_UserAccount}
        ${mutation_Township}
        ${mutation_Region}
        ${mutation_CustomerOrder}
        ${mutation_CustomerOrderDetail}
        ${mutation_ChatMessage}
    }   

    type Subscription{
        ${subscription_ChatMessage}
    }
    
    schema{
        query:Query
        mutation:Mutation
    }
    
`;
export default Schema;