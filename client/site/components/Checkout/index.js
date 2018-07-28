import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AppBar from '../AppBar';
import Accounting from 'accounting';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {userAccountByIdQuery} from '../../apollo/UserAccount';
import { createCustomerOrderMutation } from '../../apollo/CustomerOrder';


class CheckOut extends React.Component{

    checkOut(){
        let {UserAccount,createCustomerOrder,cartItems,id,shipping,showSnackbar,clearCart,router} = this.props;
        let {shippingAddress} = shipping ? shipping :{};

        let detail = cartItems.map(({id,Qty,Price})=>({ProductId:id,Qty,Price}));

        let order ={
            UserAccountId:id,
            ShippingAddress:shippingAddress,
            detail
        };

        createCustomerOrder(order)
            .then(({data})=>{
                let {createCustomerOrder} = data? data: {};
                let{instance,errors} = createCustomerOrder?createCustomerOrder:{};
                if(instance){
                    showSnackbar(`You have already submitted order.`);
                    clearCart();
                    router.push('/order');
                }
                    
            });

    }

    render(){
        let {ShippingAddress,UserAccount,shipping,cartItems} = this.props;
        let {shippingAddress} = shipping ? shipping : {};
        let {FullName,PhoneNo} = UserAccount ? UserAccount : {};
        let totalAmount = 0;
        for(let item of cartItems){
            totalAmount += item.Qty * item.Price;
        }

        return (
            <div className="fullheight">
                <div className="col align-self-center">
					<div className="row justify-content-center" style={{margin:'10px'}}>
                        <div className="col-auto">
                            FullName
                        </div>
                        <div className="col">
                        {FullName}
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{margin:'10px'}}>
                        <div className="col-auto">
                            PhoneNo
                        </div>
                        <div className="col">
                        {PhoneNo}
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{margin:'10px'}}>
                        <div className="col-auto">
                            TotalAmount
                        </div>
                        <div className="col">
                            {Accounting.formatMoney(totalAmount)}
                        </div>
                    </div>                    
                    <div className="row justify-content-center" style={{margin:'10px'}}>
                        <div className="col-auto">
                            Address
                        </div>
                        <div className="col">
                            <TextField style={{width:'300px',textAlign:'left'}} multiLine={true} rows={3}  hintText="Shipping Address"  id="Address" multiLine={true} rows={5} floatingLabelText="Shipping Address" value={shippingAddress} onChange={(e)=>{this.props.edit({shippingAddress:e.target.value});}}/>
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{margin:'10px'}}>
                        <div className="col-auto">
                            <FlatButton label="Checkout" primary={true} onClick={this.checkOut.bind(this)}/>
                        </div>
                        <div className="col">
                        
                        </div>
                    </div>
                </div>
                {/* <div className="fullheight"
                    style={{flexWrap:'nowrap'}}>
                    <div className="row">
                        <div className="col-xs-2">FullName</div>
                        <div className="col-xs-6">{FullName}</div>
                    </div>
                    <div className="row">
                        <div className="col-xs-2">PhoneNo</div>
                        <div className="col-xs-6">{PhoneNo}</div>
                    </div>       
                    <div className="row">
                        <div className="col-xs-2">TotalAmount</div>
                        <div className="col-xs-6">{totalAmount}</div>
                    </div>             
                    <div className="col-xs-5">
                        
                    </div>
                    <div className="col-xs-1">
                        
                    </div>
                </div>					 */}
            </div>
        );
    }
}


export default compose(
    connect(
        state=>({id:state.UserProfile.userId,cartItems:state.ProductDetail.cart.items,shipping:state.Shipping.edit}),
        dispatch=>({
            edit:(edit)=>{
				dispatch({type:'SHIPPING_EDIT',edit});
            },
            showSnackbar:(message)=>{
                dispatch({type:'SITE_SNACKBAR_OPEN',message});
            },
            clearCart:()=>{
                dispatch({type:'PRODUCT_CART_ITEMS_RESET'});
            }
        })
    ),
    withRouter,
    userAccountByIdQuery,
    createCustomerOrderMutation
)(CheckOut);