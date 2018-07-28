import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {GridList,GridTile} from 'material-ui/GridList';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import {compose} from 'react-apollo';
import IconButton from 'material-ui/IconButton';
import ProductCard from './ProductCard';
import Accounting from 'accounting';
import searchProductQuery from '../../apollo/Product';

class ProductGrid extends React.Component{
    componentDidMount(){

    }

    componentWillReceiveProps(){

    }

    componentDidUpdate(prevProps){

    }

    addCartItem(item){
		let {addToCartQty,addCartItem,closeMe,showSnackbar,cartItems} = this.props;
        let {id,Alias,Name,Thumb,Price,UOM} = item;
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

        const styles = {
            root: {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            },
            gridList: {
              width: '800',
              height: '800',
              overflowY: 'auto',
            },
          };

        let {loading,loadMore,page,hasMore,Product,router} = this.props;

        return(
            <div className="fullheight layout">
                {/* <div style={styles.root}>
                    <GridList
                    cellHeight={180}   
                    cols={5}                 
                    style={styles.gridList}
                    >
                    {Product ? Product.map(({id,Alias,Name,Thumb,Price,UOM}) => (
                        <a href="#" onClick={(e)=>{e.preventDefault();router.push(`/detail/${id}`);}} style={{textDecoration:"none"}}>
                            <GridTile
                            key={id}
                            title={Name}
                            subtitle={<span>Price : <b>{Accounting.formatMoney(Price)}</b></span>}
                            actionIcon={<IconButton onClick={(item)=>{this.addCartItem({id,Alias,Name,Thumb,Price,UOM});}}><AddCart color="white" /></IconButton>}
                            >
                            <img style={{width:"100%",height:'100%',flexShrink:'0'}} src={Thumb} />
                            </GridTile>
                        </a>
                    )): null}
                    </GridList>
                </div> */}
                <div className="fullheight scrollable row grid">
                {
                    Product ? Product.map((p)=>(<ProductCard key={p.id} Product={p} style={{marginTop:'20px',marginLeft:'10px',marginRight:'10px'}} />)) : ''
                }
                </div>
            </div>
        );
    }

}

export default compose(
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
    withRouter,
    searchProductQuery
)(ProductGrid);



