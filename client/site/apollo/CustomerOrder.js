import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {default as immutableUpdate} from 'react-addons-update';

const CUSTOMER_ORDER_QUERY = gql `
    query CustomerOrder($customerId:Int,$page:Int!,$pageSize:Int){
        CustomerOrders:CustomerOrder(customerId:$customerId,page:$page,pageSize:$pageSize){
            CustomerOrder{
                id
                OrderNo
                OrderDate
                UserAccountId
                ShippingAddress
                TotalAmount
                TotalQty
                detail{
                    id
                    Product{
                        Name
                    }
                    Qty
                    Price
                }
            }
        }
    }
`;

const customerOrderQuery = graphql(CUSTOMER_ORDER_QUERY,{
    options({customerId,page,pageSize}){
        return {
            variables:{
                customerId,
                page,
                pageSize:pageSize ? pageSize: 10
            }
        }
    },
    props({ownProps:{customerId},data:{loading,CustomerOrders,refetch,fetchMore}}){
        let {page,pageSize,hasMore,CustomerOrder} = CustomerOrders ? CustomerOrders : {};
        return {
            customerId,
            loading,
            page:page? page: 1,
            pageSize,
            hasMore,
            CustomerOrder,
            loadMore(page) {
                return fetchMore({
                    variables:{
                        page:page,
                        pageSize,
                        customerId
                    },
                    updeateQuery:(previousResult,{fetchMoreResult})=>{
                        if(!fetchMoreResult){
                            return previousResult;
                        }
                        const result =  Object.assign({},previousResult,{
                            CustomerOrders:Object.assign({},previousResult.CustomerOrders,fetchMoreResult.CustomerOrders,{
                                CustomerOrder:[...previousResult.CustomerOrders.CustomerOrder, ...fetchMoreResult.CustomerOrders.CustomerOrder]
                            })
                        });
                        return result;
                    }
                });
            }
        }
    }

})

const CREATE_CUSTOMERORDER_MUTATION = gql `
    mutation createCustomerOrder($order:InputCustomerOrder){
        createCustomerOrder(order:$order){
            instance{
                id
                OrderDate
                OrderNo
                UserAccountId
                ShippingAddress
                detail{
                    id
                    Product{
                        Name
                    }
                    Qty
                    Price
                }
            }
        }
    }
`;

const createCustomerOrderMutation = graphql(CREATE_CUSTOMERORDER_MUTATION,{
    props:({ownProps,mutate})=>{
        return {
            createCustomerOrder:(order)=>{
                return mutate({
                    variables:{order}
                });
            }
        }
    }
});

export default customerOrderQuery;

export {createCustomerOrderMutation}