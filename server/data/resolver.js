/**
 * Created by ChitSwe on 1/2/17.
 */
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import {resolver as resolver_ProductGroup} from './ProductGroup';
import {resolver as resolver_ProductBrand} from './ProductBrand';
import {resolver as resolver_ProductCategory} from './ProductCategory';
import {resolver as resolver_UOM} from './UOM';
import {resolver as resolver_Product} from './Product';
import {resolver as resolver_Supplier} from './Supplier';
import {resolver as resolver_Township} from './Township';
import {resolver as resolver_Region} from './Region';
import {resolver as resolver_UserAccount} from './UserAccount';
import {resolver as resolver_CustomerOrder} from './CustomerOrder';
import {resolver as resolver_CustomerOrderDetail} from './CustomerOrderDetail';
import {resolver as resolver_ChatMessage} from './ChatMessage';
//import {resolver as resolver_CustomerOrderShipment} from './CustomerOrderShipment';
const Resolver={
    DateTime:new GraphQLScalarType({
        name: 'DateTime',
        description: 'Date time custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.toJSON(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return new Date(ast.value); // ast value is always in string format
            }
            return null;
        },
    }),
    Date:new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return (new Date(value)).dateOnly(); // value from the client
        },
        serialize(value) {
            return value.toDateOnlyJSON(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return new Date(ast.value); // ast value is always in string format
            }
            return null;
        },
    }),
    Query:{

    },
    Mutation:{

    },
    Subscription:{
        
    }
};

Object.assign(Resolver,resolver_ProductGroup.type);
Object.assign(Resolver.Query,resolver_ProductGroup.query);
Object.assign(Resolver.Mutation,resolver_ProductGroup.mutation);

Object.assign(Resolver,resolver_ProductBrand.type);
Object.assign(Resolver.Query,resolver_ProductBrand.query);
Object.assign(Resolver.Mutation,resolver_ProductBrand.mutation);

Object.assign(Resolver,resolver_ProductCategory.type);
Object.assign(Resolver.Query,resolver_ProductCategory.query);
Object.assign(Resolver.Mutation,resolver_ProductCategory.mutation);

Object.assign(Resolver,resolver_Product.type);
Object.assign(Resolver.Query,resolver_Product.query);
Object.assign(Resolver.Mutation,resolver_Product.mutation);

Object.assign(Resolver,resolver_UOM.type);
Object.assign(Resolver.Query,resolver_UOM.query);
Object.assign(Resolver.Mutation,resolver_UOM.mutation);

Object.assign(Resolver,resolver_Region.type);
Object.assign(Resolver.Query,resolver_Region.query);
Object.assign(Resolver.Mutation,resolver_Region.mutation);

Object.assign(Resolver,resolver_Township.type);
Object.assign(Resolver.Query,resolver_Township.query);
Object.assign(Resolver.Mutation,resolver_Township.mutation);

Object.assign(Resolver,resolver_Supplier.type);
Object.assign(Resolver.Query,resolver_Supplier.query);
Object.assign(Resolver.Mutation,resolver_Supplier.mutation);

Object.assign(Resolver,resolver_UserAccount.type);
Object.assign(Resolver.Query,resolver_UserAccount.query);
Object.assign(Resolver.Mutation,resolver_UserAccount.mutation);

Object.assign(Resolver,resolver_CustomerOrder.type);
Object.assign(Resolver.Query,resolver_CustomerOrder.query);
Object.assign(Resolver.Mutation,resolver_CustomerOrder.mutation);


Object.assign(Resolver,resolver_CustomerOrderDetail.type);
Object.assign(Resolver.Query,resolver_CustomerOrderDetail.query);
Object.assign(Resolver.Mutation,resolver_CustomerOrderDetail.mutation);

Object.assign(Resolver,resolver_ChatMessage.type);
Object.assign(Resolver.Query,resolver_ChatMessage.query);
Object.assign(Resolver.Mutation,resolver_ChatMessage.mutation);
Object.assign(Resolver.Subscription,resolver_ChatMessage.subscription);

export default  Resolver;