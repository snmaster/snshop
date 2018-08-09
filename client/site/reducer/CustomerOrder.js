import update from 'react-addons-update';

const initialData = {
    id:undefined,
    OrderDate:undefined,
    OrderNo:'',
    UserAccountId:undefined,
    ShippingAddress:'',
    TotalAmount:0,
    TotalQty:0,
    orderStatus:'',
    detail:[]
};

const CustomerOrder=(state=initialData,action)=>{
    switch(action.type){
        case 'CUSTOMER_ORDER_EDIT':
            return update(state,{
                $set:action.edit
            });
            break;
        default:
            return state;
    }
};

export default CustomerOrder;