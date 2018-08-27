import React from 'react';
import CartItem from './CartItem';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Accounting from 'accounting';
import { white, blue800 } from 'material-ui/styles/colors';
import {withRouter} from 'react-router';
import AppBar from '../AppBar';
import Loader from '../../../common/Loader';
class Cart extends React.Component{
	componentDidMount(){
		
	}
	componentWillReceiveProps({CustomerOrderDetailPreview}){

	}

	cartCheckOut(){
		let {userProfile,router,cart,showSnackbar} = this.props;
		let {items} = cart? cart:{};
		let {userId} = userProfile;
		if(userId == "")
		{
			window.location=`/customer/login?redirectUrlOnSuccess=${encodeURIComponent("/checkout/process")}`;
		}	
		else
		{
			if(items.length > 0)
				router.push(`/checkout/process`);
			else
				showSnackbar("No Items to checkout.");
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
			<div className="fullheight scrollable">
                <AppBar title="ShoppingCart"/>				
				<div className="row justify-content-center" style={{height:'50px',background:'#0000',textAlign:'center'}}>
					<h3>Review & Checkout</h3>
				</div>
				<div className="row justify-content-center">					
					{
						items && items.length > 0 ? 
							<div className="col-md-10 col-md-offset-3">
								<div >
									<div className="row" style={{height:'80px',border:'1px solid'}}>
										<div className="col-xs-6 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Product Name</div>
										<div className="col-xs-2 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Unit Price</div>
										<div className="col-xs-2 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Qty</div>                                
										<div className="col-xs-2 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Subtotal</div>
									</div>
									{items? items.length > 0 ? items.map((i,index)=>(<CartItem key ={i.id} index={index} item={i}/>)):<div><h3>Your Cart is empty.</h3></div> : null}
								</div>
								<div className="summary-row row">
									<div className="col-md-10 col-sm-8 col-xs-6" style={{float:'right'}}>
										Total
									</div>
									<div className="col-sm-2">
										{Accounting.formatMoney(totalAmount)}
									</div>
								</div>								
							</div>
						: 
						<div className="col-md-10 col-md-offset-3" style={{border:'1px solid black',width:'100%',height:'100px',verticalAlign:'middle'}}>
							<span style={{marginTop:'50px',marginBottom:'50px',textAlign:'center',marginTop:'20px'}}><h3>Your Cart is empty.</h3></span>
						</div>
					}				
				</div>
				<div className="row justify-content-center" style={{marginTop:'30px'}}>
						<RaisedButton
							onClick={()=>{router.push("/");}}
							labelPosition="before"
							label="Continue Shopping"
							backgroundColor={blue800}
							labelColor={white}
							primary={true}
							className="col-xs-2 offset-xs-2"
							style={{marginLeft:'20px'}}
							/>
						<RaisedButton
							onClick={this.cartCheckOut.bind(this)}
							labelPosition="before"
							label="Proceed To Checkout"
							backgroundColor={blue800}
							labelColor={white}							
							primary={true}
							className="col-xs-2 offset-xs-2"
							style={items.length === 0 ? {display:'none'} : {display:'block',marginLeft:'20px'}}
							/>
						{/* <FlatButton label="Continue Shopping" primary={true} onClick={()=>{router.push("/");}}/>
						<FlatButton label="Checkout" primary={true} onClick={this.cartCheckOut.bind(this)}/> */}
					
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
				showSnackbar:(message)=>{
					dispatch({type:'SITE_SNACKBAR_OPEN',message});
				},
			})
			),
		withRouter
	)(Cart);