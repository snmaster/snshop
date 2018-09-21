import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {withRouter} from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import ProdInfo from 'material-ui/svg-icons/action/info';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Accounting from 'accounting';
import {connect} from 'react-redux';
import { white, blue800 } from 'material-ui/styles/colors';
import { blue700 } from 'material-ui/styles/colors';
import { purple500 } from 'material-ui/styles/colors';
class ProductCard extends React.Component{
	constructor(){
		super(...arguments);
		this.state ={
			showOverlay:false
		};
	}
	addCartItem(){
		let {Product,addCartItem,showSnackbar,cartItems} = this.props;
        let {id,Alias,Name,Thumb,Price,UOM} = Product;
        let Qty = 1;
        for(let item of cartItems){
			if(item.id == id){
				Qty = Qty + 1;
			}
		}

		if(window.env === "production")
			gtag('event','add_to_cart');
			
			addCartItem({id,Alias,Name,Thumb,Price,UOM,Qty});
			//closeMe();
			showSnackbar(`${Name} has been added to cart.`);	
		
	}

	render(){
		let {Product,router,resetSpecFilter} = this.props;
		let {Alias,Name,Thumb,Price,id,UOM} = Product;
		
		return (
				<div className="col-lg-2 col-md-3 col-sm-3 col-xs-12" style={{margin:'2px'}}>					
					<Card onMouseEnter={()=>{this.setState({showOverlay:true});}} onMouseLeave={()=>{this.setState({showOverlay:false});}}>
						<CardMedia style={{maxWidth:'300px',minWidth:'0',display:'block',margin:'0 auto'}} 
							overlayContentStyle={{background:'transparant'}}
							overlay={
								<div className="col">
									{/* <div className="row align-items-start" style={{float:'right',textAlign:'right',verticalAlign:'top'}}>
										<Avatar 
											color={white}
											backgroundColor={purple500}
											size={30}
											style={{margin:5}}>Hot</Avatar>
									</div> */}
									<div className="row align-items-center" style={this.state.showOverlay === false ? {display: 'none'} : {textAlign:'center',verticalAlign:'middle'}}>
										{/* <FloatingActionButton mini={true} backgroundColor={blue700} 
											style={{marginLeft:'10px'}} onClick={this.addCartItem.bind(this)}>
											<AddCart />
										</FloatingActionButton> */}
										<RaisedButton
											onClick={this.addCartItem.bind(this)}
											labelPosition="before"
											label="Add To Cart"
											backgroundColor={blue800}
											labelColor={white}
											primary={true}
											icon={<AddCart color='white' />}
											/>
									</div>
								</div>
							}>
							<img style={{width:'130px',height:'150px'}} src={Thumb}/>
							</CardMedia>
							{/* <CardTitle title={Name} subtitle={Alias} onClick={(e)=>{e.preventDefault();router.push(`/detail/${id}`);}}/> */}
							<CardText>
								<div style={{padding:'10px 5px'}}>
									<div className="text-title" onClick={(e)=>{e.preventDefault();router.push(`/detail/${id}`);}}>{Name}</div>
									{/* <div className="text-subtitle">{Alias}</div> */}
									<div className="text-price">{Accounting.formatMoney(Price)}</div>
								</div>
							</CardText>
						/>
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