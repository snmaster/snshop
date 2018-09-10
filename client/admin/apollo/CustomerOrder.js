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
                Customer{
                    UserName
                    FullName
                    PhoneNo
                }
                ShippingAddress
                ShippingCost
                TotalAmount
                TotalQty
                OrderStatus
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

});

const CUSTOMER_ORDER_BYID_QUERY = gql `
query customerOrderById($id:Int!,$customerId:Int){
    CustomerOrder:customerOrderById(id:$id,customerId:$customerId){
        id
        OrderNo
        OrderDate
        UserAccountId
        Customer{
            UserName
            FullName
            PhoneNo
        }
        ShippingAddress
        ShippingCost
        TotalAmount
        TotalQty
        OrderStatus
        detail{
            id
            Product{
                Name
                Alias
                Thumb
            }
            Qty
            Price
        }
    }
}
`;

const customerOrderByIdQuery = graphql(
	CUSTOMER_ORDER_BYID_QUERY,{
		options:({id,customerId})=>({
				variables:{id,customerId},
				skip:!id
		}),
		props:({data:{CustomerOrder,loading,refetch,fetchMore}})=>{
			return{
				loading,
				CustomerOrder
			};
		}
	}
);

const CREATE_CUSTOMERORDER_MUTATION = gql `
    mutation createCustomerOrder($order:InputCustomerOrder){
        createCustomerOrder(order:$order){
            instance{
                id
                OrderDate
                OrderNo
                UserAccountId
                ShippingAddress
                ShippingCost
                OrderStatus
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

const DELETE_CUSTOMER_ORDER_MUTATION = gql`
mutation deleteCustomerOrder($id:Int!){
    deleteCustomerOrder(id:$id){
        id
    }
}
`;

const deleteCustomerOrderMutation = graphql(DELETE_CUSTOMER_ORDER_MUTATION,{
props:({mutate})=>{
    return {
        deleteCustomerOrder:(args)=>{
            args.updateQueries={
                customerOrderQuery:(prev,{mutationResult})=>{
                    let mutatedInstance = mutationResult.data.deleteCustomerOrder;
                    if(!mutatedInstance)
                        return prev;
                        
                    let index = null;
                    prev.CustomerOrder.every((g,i)=>{
                        if(g.id===mutatedInstance.id){
                            index=i;
                            return false;
                        }else
                            return true;
                    });

                    return index != null? immutableUpdate({
                        CustomerOrder:{
                            $splice:[[index,1]]
                        }
                    }): prev;

                }
            };
            return mutate(args);
        }
    };
}
})


export default customerOrderQuery;

export {createCustomerOrderMutation,customerOrderByIdQuery,deleteCustomerOrderMutation}