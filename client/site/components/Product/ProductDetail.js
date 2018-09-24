import React from 'react';
import {Card,CardTitle,CardText,CardActions} from 'material-ui/Card';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {gray, purple200} from 'material-ui/styles/colors';
import AppBar from '../AppBar';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import RaisedButton from 'material-ui/RaisedButton';
import Accounting from 'accounting';
import { productByIdQuery } from '../../apollo/Product';
import CategoryPath from './CategoryPath';
import ProductCategory from '../../apollo/ProductCategory';
//import {Helmet} from 'react-helmet';

class ProductDetail extends React.Component{
    componentDidMount(){

    }

    componentWillReceiveProps(){

    }

    addCartItem(){
		let {Product,addToCartQty,addCartItem,closeMe,showSnackbar,cartItems} = this.props;
        let {id,Alias,Name,Thumb,Price,UOM,ProductCategory} = Product;

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
        let {Product} = this.props ? this.props : {};
        let {id,Name,Alias,Description,Image,Thumb,Price,UOM,ProductCategory} = Product ? Product : {};

        return(
            <div className="layout fullheight"> 
                {/* <Helmet>
                    <title>{Product? Product.Name:"Product"}</title>
                </Helmet> */}
                <AppBar title="Product Detail"/>         
                <div className={`fullheight scrollable `}>
                    <div style={{padding:'10px'}}>
                        <Card>
                            <div className="row">
                                <CategoryPath className="col-xs-8" categoryId={ProductCategory ? ProductCategory.id : null} />
                                <div className="col-xs-2" style={{marginTop:'20px'}}>
                                    <h4>{Name}</h4>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-offset-1 col-sm-6 col-xs-12">
                                    <img style={{width:'100%'}} src={Image} />
                                </div>                                
                                <div className="col-sm-6 col-xs-12">
                                    <CardTitle title={Name} subtitle={Alias}>
                                        {
                                            UOM?(<span style={{fontSize:'12px',fontWeight:'500'}}>Unit: {UOM.Name}</span>): null
                                        }
                                    </CardTitle>
                                    <CardText>
                                        <span style={{fontSize:'12px',fontWeight:'500'}}>{Description}</span><br/>
                                        <span style={{color:'red',fontSize:'12px',fontWeight:'500'}}>Price : {Accounting.formatMoney(Price)}</span><br/>
                                    </CardText>
                                    <CardActions>
                                        <RaisedButton
                                            onClick={this.addCartItem.bind(this)}
                                            labelPosition="before"
                                            label="Add To Cart"
                                            style={{background:'purple',color:'white',marginTop:'25px',marginBottom:'15px'}}
                                            primary={true}
                                            icon={<AddCart color='white'/>}
                                            />
                                    </CardActions>
                                </div>
                                <br/>
                                
                            </div>
                        </Card>
                    </div>    
                </div>                
            </div>
        );
    }
    
}

const TheComponent = compose(
    connect(
        state=>({cartItems:state.ProductDetail.cart.items}),
        dispatch=>({
            addCartItem:(item)=>{
                dispatch({type:'PRODUCT_CART_ADD_ITEM',item});
            },
            showSnackbar:(message)=>{
                dispatch({type:'SITE_SNACKBAR_OPEN',message});
            }
        })
    ),  
    productByIdQuery
)(ProductDetail);

export default ({params})=>{
    let {id} = params ? params : {};
    return (<TheComponent id={id}/>)
}