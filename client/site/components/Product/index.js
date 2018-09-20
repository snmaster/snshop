import React from 'react';
import {graphql,compose} from 'react-apollo';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import Waypoint from 'react-waypoint';
import loader from '../../../common/Loader';
import AppBar from '../AppBar';
import CategoryMenu from '../CategoryMenu';
import ProductGrid from './ProductGrid';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right';
import ActionSearch from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {withRouter} from 'react-router';
import {getRootCategoryQuery,productCategorybyIdQuery} from '../../apollo/ProductCategory';
import productBrandQuery from '../../apollo/ProductBrand';
import { white } from 'material-ui/styles/colors';
import { blue500 } from 'material-ui/styles/colors';
//import AppBar from 'material-ui/AppBar';

class ProductBrowser extends React.Component{
	constructor(){
		super(...arguments);
		this.state = {
			search:'',
			searchText:'',
			brandId:null
		};
	}

	componentWillReceiveProps(nextProps){
		if(this.props.categoryId !== nextProps.categoryId){
			this.setState({search:'',searchText:''});
		}
	}

	render(){
		let {productCategoryId,ProductCategoryById,rootCategories,ProductBrand,router} = this.props ? this.props: {};
		let {search,searchText,brandId} = this.state ? this.state : {};
		let {SubCategories,Name} = ProductCategoryById ? ProductCategoryById : [];

		return(
				<div className="layout fullheight">
					<AppBar title="Product Browser"/>
					<div className="fullheight scrollable"
						style={{flexWrap:'nowrap'}}>
						<div className="row" style={{width:'100%',height:'50px'}}>
							{
								rootCategories ? rootCategories.map((c,i)=>(<ListItem key={i} primaryText={c.Name} style={{width:'180px'}} height={20} rightIcon={<RightArrow />} onClick={()=>{router.push(`/Product/${c.id}`);}}/>)): null
							}
							<TextField id="search" name="search" onChange={(e)=>{this.setState({searchText:e.target.value})}} style={{width:'200px'}} hintText="search product..." />
							{/* <RaisedButton id="searchButton" name="searchButton" onClick={()=>{this.setState({search:searchText})}} /> */}
							<IconButton id="searchButton" name="searchButton" onClick={()=>{this.setState({search:searchText})}}><ActionSearch color={blue500}/></IconButton>
						</div>
						<div className="row" style={{width:'100%'}}>
							<div className="col-md-2">
								<div style={SubCategories.length > 0 ? {marginTop:'10px'} : {display:'none'}} >Sub Categories</div>
								{
									SubCategories ? SubCategories.map((c,i)=>(<ListItem key={i} primaryText={c.Name} style={{width:'100%'}} leftIcon={<RightArrow />} onClick={()=>{router.push(`/Product/${c.id}`);}} />)) : null
								}
								<div>Top Brands</div>
								{
									ProductBrand ? ProductBrand.map((b,i)=>(<ListItem key={i} primaryText={b.Name} style={{width:'100%'}} onClick={()=>{this.setState({brandId:b.id});}} />)) : null
								}
							</div>
							<div className="col-md-10">
								<ProductGrid productCategoryId={productCategoryId} brandId={brandId} search={search} style={{margin:'10px'}}/>
							</div>
						</div>
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
	),
	withRouter,
	productBrandQuery,
	productCategorybyIdQuery,
	getRootCategoryQuery
)(ProductBrowser);

export default ({params})=>{
	let {id} = params ? params: {};
	return (<TheComponet productCategoryId={id} id={id} categoryId={id} page={1}/>)
}