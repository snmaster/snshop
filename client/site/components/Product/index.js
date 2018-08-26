import React from 'react';
import {graphql,compose} from 'react-apollo';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import Waypoint from 'react-waypoint';
import loader from '../../../common/Loader';
import AppBar from '../AppBar';
import CategoryMenu from '../CategoryMenu';
import ProductGrid from './ProductGrid';
//import AppBar from 'material-ui/AppBar';

class ProductBrowser extends React.Component{
	render(){
		let {productCategoryId} = this.props ? this.props: {};
		return(
				<div className="layout fullheight">
					<AppBar title="Product Browser"/>
					<div className="fullheight scrollable"
						style={{flexWrap:'nowrap'}}>
						<ProductGrid productCategoryId={productCategoryId} style={{margin:'10px'}}/>
					</div>					
				</div>
			);
	}

}

const TheComponet = compose(
	connect(
		state=>({}),
		dispatch=>({

		})
	)
)(ProductBrowser);

export default ({params})=>{
	let {id} = params ? params: {};
	return (<TheComponet productCategoryId={id} page={1}/>)
}