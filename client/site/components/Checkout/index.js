import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from '../AppBar';
import Accounting from 'accounting';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { white, blue800 } from 'material-ui/styles/colors';
import {userAccountByIdQuery} from '../../apollo/UserAccount';
import { createCustomerOrderMutation } from '../../apollo/CustomerOrder';


class CheckOut extends React.Component{

    checkOut(){
        let {UserAccount,createCustomerOrder,cartItems,id,shipping,showSnackbar,clearCart,router} = this.props;
        let {shippingAddress} = shipping ? shipping :{};

        let detail = cartItems.map(({id,Qty,Price})=>({ProductId:id,Qty,Price}));
        let shippingCost = 2000;
        let order ={
            UserAccountId:id,
            ShippingCost:shippingCost,
            ShippingAddress:shippingAddress,
            detail
        };

        createCustomerOrder(order)
            .then(({data})=>{
                let {createCustomerOrder} = data? data: {};
                let{instance,errors} = createCustomerOrder?createCustomerOrder:{};
                if(instance){
                    showSnackbar(`You have already submitted order.`);
                    let {id,OrderDate,OrderNo,UserAccountId,ShippingAddress,TotalAmount,TotalQty,detail} = instance ? instance : {};
                    this.props.editOrder({id,OrderDate,OrderNo,UserAccountId,ShippingAddress,TotalAmount,TotalQty,orderStatus:'A',detail});
                    clearCart();
                    router.push(`/customer/confirmOrder`);
                }                    
            });

    }

    render(){
        let {ShippingAddress,UserAccount,shipping,cartItems,router} = this.props;
        let {shippingAddress} = shipping ? shipping : {};
        let {FullName,PhoneNo} = UserAccount ? UserAccount : {};
        let totalAmount = 0;
        let shippingCost  = 2000;
        for(let item of cartItems){
            totalAmount += item.Qty * item.Price;
        }

        return (
            <div className="layout fullheight">
                <AppBar title="Product Browser"/>
                <div style={{width:'100%',height:'50px',textAlign:'center',marginTop:'50px'}}>
                    <h3>Confirm Checkout</h3>
                </div>
                <div className="fullheight scrollable" style={{marginTop:'50px',marginLeft:'10px',marginRight:'10px'}}>
					<div className="row justify-content-center" >
                        {/* <div className="col-xs-2" /> */}
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            FullName
                        </div>
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                        {FullName}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {/* <div className="col-xs-2"/> */}
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            PhoneNo
                        </div>
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                        {PhoneNo}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {/* <div className="col-xs-2"/> */}
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            SubTotal
                        </div>
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            {Accounting.formatMoney(totalAmount)}
                        </div>
                    </div>          
                    <div className="row justify-content-center">
                        {/* <div className="col-xs-2"/> */}
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            ShippingCost
                        </div>
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            {Accounting.formatMoney(shippingCost)}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {/* <div className="col-xs-2"/> */}
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            TotalAmount
                        </div>
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            {Accounting.formatMoney(shippingCost+totalAmount)}
                        </div>
                    </div>          
                    <div className="row justify-content-center">
                        {/* <div className="col-xs-2"/> */}
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'120px'}}>
                            Shipping Address
                        </div>
                        <div className="col-xs-6 col-md-5" style={{border:'1px solid #ccc',padding:'10px',height:'120px'}}>
                            <textarea style={{width:'100%',height:'100px',textAlign:'left'}} rows={4}  id="Address" cols="100" value={shippingAddress} onChange={(e)=>{this.props.edit({shippingAddress:e.target.value});}}/>
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{margin:'10px',height:'50px'}}>
                        <div className="col-xs-6 col-md-5">
                            
                        </div>
                        <div className="col-xs-6 col-md-5">
                            <RaisedButton
                                onClick={this.checkOut.bind(this)}
                                labelPosition="before"
                                label="Process"
                                backgroundColor={blue800}
                                labelColor={white}
                                primary={true}
                                />
                            {/* <button type="button" style={{background:'darkblue',color:'white',width:'150px'}} onClick={this.checkOut.bind(this)}>CheckOut</button>     */}
                        </div>
                    </div>                    
                </div>
                {/* <div className="fullheight"
                    style={{flexWrap:'nowrap'}}>
                    <div className="row">
                        <div className="col-xs-2">FullName</div>
                        <div className="col-xs-6 col-md-5">{FullName}</div>
                    </div>
                    <div className="row">
                        <div className="col-xs-2">PhoneNo</div>
                        <div className="col-xs-6 col-md-5">{PhoneNo}</div>
                    </div>       
                    <div className="row">
                        <div className="col-xs-2">TotalAmount</div>
                        <div className="col-xs-6 col-md-5">{totalAmount}</div>
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
            editOrder:(edit)=>{
                dispatch({type:'CUSTOMER_ORDER_EDIT',edit});
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