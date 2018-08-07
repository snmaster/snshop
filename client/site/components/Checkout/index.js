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
                    router.push('/customer/order');
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
            <div className="layout fullheight">
                <AppBar title="Product Browser"/>
                <div className="fullheight">
					<div className="row justify-content-center" style={{marginTop:'50px'}}>
                        {/* <div className="col-xs-2" /> */}
                        <div className="col-xs-3" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            FullName
                        </div>
                        <div className="col-xs-3" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                        {FullName}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {/* <div className="col-xs-2"/> */}
                        <div className="col-xs-3" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            PhoneNo
                        </div>
                        <div className="col-xs-3" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                        {PhoneNo}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {/* <div className="col-xs-2"/> */}
                        <div className="col-xs-3" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            TotalAmount
                        </div>
                        <div className="col-xs-3" style={{border:'1px solid #ccc',padding:'10px',height:'35px'}}>
                            {Accounting.formatMoney(totalAmount)}
                        </div>
                    </div>                    
                    <div className="row justify-content-center">
                        {/* <div className="col-xs-2"/> */}
                        <div className="col-xs-3" style={{border:'1px solid #ccc',padding:'10px',height:'120px'}}>
                            Address
                        </div>
                        <div className="col-xs-3" style={{border:'1px solid #ccc',padding:'10px',height:'120px'}}>
                            <textarea style={{width:'300px',height:'100px',textAlign:'left'}} rows={4}  id="Address" cols="100" value={shippingAddress} onChange={(e)=>{this.props.edit({shippingAddress:e.target.value});}}/>
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{margin:'10px',height:'50px'}}>
                        {/* <div className="col-xs-2"/> */}
                        <div className="col-xs-3">
                            
                        </div>
                        <div className="col-xs-3">
                            <button type="button" style={{background:'darkblue',color:'white',width:'150px'}} onClick={this.checkOut.bind(this)}>CheckOut</button>    
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