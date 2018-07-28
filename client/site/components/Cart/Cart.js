import React from 'react';
import CartItem from './CartItem';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Accounting from 'accounting';
import {withRouter} from 'react-router';
import AppBar from '../AppBar';
import Loader from '../../../common/Loader';
class Cart extends React.Component{
	componentDidMount(){
		
	}
	componentWillReceiveProps({CustomerOrderDetailPreview}){

	}

	cartCheckOut(){
		let {userProfile,router} = this.props;
		let {userId} = userProfile;
		if(userId == "")
		{
			window.location=`/login?redirectUrlOnSuccess=${encodeURIComponent("/checkout")}`;
		}	
		else
		{
			router.push(`/checkout`);
		}		
	}
	
	render(){
		let {cart,router} = this.props;
		let {items} = cart? cart:{};
		let inputFieldStyle = {padding:"0 8px"};
		let totalAmount =0;

		for(let {Qty,Price} of items){
            totalAmount += Qty * Price;
		}
		
		return (
			<div className="fullheight layout">
                <AppBar title="ShoppingCart"/>
				<div className="fullheight scrollable">
					<div className="cart-grid">
						<div >
							<div className="row" style={{height:'80px',border:'1px solid'}}>
								<div className="col-xs-6 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Product Name</div>
                                <div className="col-xs-2 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Unit Price</div>
                                <div className="col-xs-2 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Qty</div>                                
                                <div className="col-xs-2 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Subtotal</div>
							</div>
							{items? items.map((i,index)=>(<CartItem key ={i.id} index={index} item={i}/>)):null}
						</div>
						<div className="summary-row row">
							<div className="col-md-10 col-sm-8 col-xs-6">
								Total
							</div>
							<div className="col-xs-6 col-sm-2">
								{Accounting.formatMoney(totalAmount)}
							</div>
						</div>
						<div className="row between-xs cart-actions-row" >
							<FlatButton label="Continue Shopping" primary={true} onClick={()=>{router.push("/");}}/>
							<FlatButton label="Checkout" primary={true} onClick={this.cartCheckOut.bind(this)}/>
						</div>
					</div>
				</div>

			</div>
			);
	}
}



export default compose(
		connect(
			state=>({
				userProfile:state.UserProfile,
				cart:state.ProductDetail.cart
			}),
			dispatch=>({
			})
			),
		withRouter
	)(Cart);