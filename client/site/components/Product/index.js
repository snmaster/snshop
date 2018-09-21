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
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ActionSearch from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import {withRouter} from 'react-router';
import Accounting from 'accounting';
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
			minAmount:0,
			maxAmount:100000,
			sortOrder:'priceASC',
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
		let {search,searchText,brandId,minAmount,maxAmount,sortOrder} = this.state ? this.state : {};
		let {SubCategories,Name} = ProductCategoryById ? ProductCategoryById : [];

		return(
				<div className="layout fullheight">
					<AppBar title="Product Browser"/>
					<div className="fullheight scrollable"
						style={{flexWrap:'nowrap'}}>
						<div className="row" style={{width:'100%',height:'55px',marginLeft:'20px',marginTop:'10px'}}>
							{
								rootCategories ? rootCategories.map((c,i)=>(<ListItem key={i} primaryText={c.Name} style={{width:'180px'}} height={20} rightIcon={<RightArrow />} onClick={()=>{router.push(`/Product/${c.id}`);}}/>)): null
							}
							<TextField id="search" name="search" onChange={(e)=>{this.setState({searchText:e.target.value})}} style={{width:'200px'}} hintText="search product..." />
							{/* <RaisedButton id="searchButton" name="searchButton" onClick={()=>{this.setState({search:searchText})}} /> */}
							<IconButton id="searchButton" name="searchButton" onClick={()=>{this.setState({search:searchText})}}><ActionSearch color={blue500}/></IconButton>
							<div style={{fontSize:'12px',marginTop:'10px',marginLeft:'10px'}}>Min :</div>
							<div className="row" style={{marginTop:'3px',fontSize:'12px',textAlign:'center'}}>
								<div className="col-xs-6" style={{marginTop:'10px'}}>{Accounting.formatMoney(minAmount)}</div>
								<Slider min={0} max={1000000} step={1000} className="col-xs-6" style={{width:'130px'}} value={minAmount} onChange={(e,value)=>{this.setState({minAmount:value});}}>
								</Slider>
							</div>
							<div style={{fontSize:'12px',marginTop:'10px'}}>Max :</div>
							<div className="row" style={{marginTop:'3px',fontSize:'10px',textAlign:'center'}}>
								<div className="col-xs-6" style={{marginTop:'10px'}}>{Accounting.formatMoney(maxAmount)}</div>
								<Slider min={0} max={1000000} step={1000} className="col-xs-6" style={{width:'130px'}} value={maxAmount} onChange={(e,value)=>{this.setState({maxAmount:value});}}>
								</Slider>
							</div>
							<div className="row" style={{margin:'1px solid'}}>
								<div style={{fontSize:'12px',marginTop:'10px',marginLeft:'10px',width:'70px'}}>Sort By:</div>
								<SelectField 
									id="sortOrder"
									name="sortOrder" 
									style={{width:'100px',marginLeft:'5px'}}
									value={sortOrder} 
									onChange={
										(e,index,value)=>{
											this.setState({sortOrder:value});
										}
									}
									hintText="Branch"
									dropDownMenuProps={
										{
											targetOrigin:{vertical:'bottom',horizontal:'left'},
											anchorOrigin:{vertical:'top',horizontal:'left'}
										}
									}
								>
									<MenuItem primaryText="Price" rightIcon={<ArrowDown />} value="priceASC" />
									<MenuItem primaryText="Price" rightIcon={<ArrowUp />} value="priceDESC"/>
								</SelectField>
							</div>							
						</div>
						<div className="row" style={{width:'100%',marginLeft:'10px'}}>
							<div className="col-md-2">
								<div style={SubCategories && SubCategories.length > 0 ? {marginTop:'10px'} : {display:'none'}} >Sub Categories</div>
								{
									SubCategories ? SubCategories.map((c,i)=>(<ListItem key={i} primaryText={c.Name} style={{width:'100%'}} leftIcon={<RightArrow />} onClick={()=>{router.push(`/Product/${c.id}`);}} />)) : null
								}
								<div>Top Brands</div>
								{
									ProductBrand ? ProductBrand.map((b,i)=>(<ListItem key={i} primaryText={b.Name} leftAvatar={<Avatar src={b.Thumb} size={30} />} style={brandId && brandId == b.id ? {width:'100%',border:'1px solid'}:{width:'100%'}} onClick={()=>{this.setState({brandId:b.id});}} />)) : null
								}
							</div>
							<div className="col-md-10">
								<ProductGrid productCategoryId={productCategoryId} brandId={brandId} minAmount={minAmount} maxAmount={maxAmount} sortOrder={sortOrder} search={search} style={{margin:'10px'}}/>
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