import React from 'react';
import {Card} from 'material-ui/Card';
import {withRouter} from 'react-router';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Accounting from 'accounting';
import {connect} from 'react-redux';
class ProductCard extends React.Component{
	addCartItem(){
		let {Product,addCartItem,showSnackbar,cartItems} = this.props;
        let {id,Alias,Name,Thumb,Price,UOM} = Product;
        let Qty = 1;
        for(let item of cartItems){
			if(item.id == id){
				Qty = Qty + 1;
			}
		}
			addCartItem({id,Alias,Name,Thumb,Price,UOM,Qty});
			//closeMe();
			showSnackbar(`${Name} has been added to cart.`);	
		
	}

	render(){
		let {Product,router,resetSpecFilter} = this.props;
		let {Alias,Name,Thumb,Price,id,UOM} = Product;
		
		return (
				<div className="col-lg-2 col-md-3 col-sm-3 col-xs-12" style={{margin:'2px'}}>					
					<Card>
						<div style={{flexWrap:'nowrap',padding:'5px'}}>
							<a href="#" onClick={(e)=>{e.preventDefault();router.push(`/detail/${id}`);}} style={{textDecoration:"none"}}>
								<img style={{width:"100px",height:'100px',flexShrink:'0',marginLeft:'10px'}} src={Thumb} />
								<div style={{padding:'0 16px'}}>
									<div><span className="text-title">{Name}</span></div>
									<div><span className="text-subtitle">{Alias}</span></div>																												
								</div>
							</a>
							<div className="row" style={{alignItems:'center',padding:'0 16px'}}>
								<span className="text-price">{Accounting.formatMoney(Price)}</span>
								<IconButton
									onClick={this.addCartItem.bind(this)}
									style={{background:'purple',color:'white',marginLeft:'10px',marginTop:'5px',marginBottom:'10px'}}
									primary={true}>
									<AddCart color='white'/>
								</IconButton>
							</div>
						</div>
					</Card>					
				</div>
			);
	}
}

export default connect(
	state=>({cartItems:state.ProductDetail.cart.items}),
	dispatch=>({
		addCartItem:(item)=>{
			dispatch({type:'PRODUCT_CART_ADD_ITEM',item});
		},
		showSnackbar:(message)=>{
			dispatch({type:'SITE_SNACKBAR_OPEN',message});
		}
	})
	)( withRouter(ProductCard));