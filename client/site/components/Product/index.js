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
import {List,ListItem} from 'material-ui/List';
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
import query,{productCategorybyIdQuery} from '../../apollo/ProductCategory';
import productBrandQuery from '../../apollo/ProductBrand';
import CategoryPath from './CategoryPath';
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
			maxAmount:1000000,
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
		let {id,productCategoryId,ProductCategoryById,rootCategories,ProductCategory,ProductBrand,router} = this.props ? this.props: {};
		let {search,searchText,brandId,minAmount,maxAmount,sortOrder} = this.state ? this.state : {};
		let {SubCategories,Name} = ProductCategoryById ? ProductCategoryById : [];

		return(
				<div className="layout fullheight">
					<AppBar title="Product Browser"/>
					<div className="fullheight scrollable"
						style={{flexWrap:'nowrap'}}>
						<div className="row" style={{width:'100%',height:'35px',marginLeft:'20px',marginBottom:'10px'}}>
						{
							ProductCategory? ProductCategory.map(p=>(<ListItem key={p.id} style={id && Number(id) === p.id ? {display:'none'}:{height:'40px',width:'auto'}} primaryText={p.Name} 
							className="CatItem" height={25} onClick={()=>{router.push(`/Product/${p.id}`);}}
							/>)):null
						}
						</div>
						{/* <CategoryMenu style={{width:'100%',height:'35px',marginLeft:'20px',marginBottom:'10px'}} className="row" targetOrigin={{vertical:'top',horizontal:'left'}} anchorOrigin={{vertical:'bottom',horizontal:'left'}}  parentCategoryId={null} /> */}
						<div className="row" style={{width:'100%',height:'55px',marginLeft:'20px',marginBottom:'10px'}}>
							<CategoryPath className="col-xs-8" categoryId={id} />
							<TextField id="search" name="search" onChange={(e)=>{this.setState({searchText:e.target.value})}} style={{width:'200px',marginTop:'10px'}} hintText="search product..." />
							{/* <RaisedButton id="searchButton" name="searchButton" onClick={()=>{this.setState({search:searchText})}} /> */}
							<IconButton id="searchButton" name="searchButton" style={{marginTop:'10px'}} onClick={()=>{this.setState({search:searchText})}}><ActionSearch color={blue500}/></IconButton>													
						</div>
						<div className="row" style={{width:'100%',marginLeft:'10px'}}>
							<div className="col-md-2">
								<div style={SubCategories && SubCategories.length > 0 ? {marginTop:'10px',borderBottom:'1px solid',borderTop:'1px solid',borderColor:'gray',marginBottom:'10px'} : {display:'none'}} >
									<div>Sub Categories</div>
									{
										SubCategories ? SubCategories.map((c,i)=>(<ListItem key={i} primaryText={c.Name} style={{width:'100%',height:'40px'}} leftIcon={<RightArrow />} onClick={()=>{router.push(`/Product/${c.id}`);}} />)) : null
									}
								</div>
								<div>Top Brands</div>
								{
									ProductBrand ? ProductBrand.map((b,i)=>(<ListItem key={i} primaryText={b.Name} leftAvatar={<Avatar src={b.Thumb} size={30} />} style={brandId && brandId == b.id ? {width:'100%',border:'1px solid',height:'40px'}:{width:'100%',height:'40px'}} onClick={()=>{this.setState({brandId:b.id});}} />)) : null
								}
							</div>
							<div className="col-md-10">
								<div className="row justify-content-end" style={{height:'50px',borderTop:'1px solid',borderBottom:'1px solid'}}>
									<div className="col-xs-6" style={{alignContent:'center',height:'50px'}}>
										{/* <div style={{fontSize:'12px',marginTop:'10px',marginLeft:'10px'}}>Min :</div> */}
										<div className="row" style={{marginTop:'3px',fontSize:'12px',textAlign:'center'}}>
											<div style={{marginTop:'10px',height:'30px',border:'1px solid',width:'120px'}}>{Accounting.formatMoney(minAmount)}</div>
											<Slider min={0} max={1000000} step={1000} style={{width:'130px',marginLeft:'10px'}} value={minAmount} onChange={(e,value)=>{this.setState({minAmount:value});}}>
											</Slider>
											<div style={{marginTop:'10px',height:'30px',border:'1px solid',width:'120px',marginLeft:'10px'}}>{Accounting.formatMoney(maxAmount)}</div>
											<Slider min={0} max={1000000} step={1000} style={{width:'130px',marginLeft:'10px'}} value={maxAmount} onChange={(e,value)=>{this.setState({maxAmount:value});}}>
											</Slider>
										</div>
									</div>
									<div className="col-xs-3">
										<div className="row">
											<div className="col-xs-3" style={{fontSize:'12px',marginTop:'15px',marginLeft:'10px'}}>Sort By:</div>
											<SelectField 
												id="sortOrder"
												name="sortOrder" 
												className="col-xs-7"
												style={{fontSize:'12px',width:'100%'}}
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
												<MenuItem primaryText="Lowest Price" style={{fontSize:'12px'}} rightIcon={<ArrowDown />} value="priceASC" />
												<MenuItem primaryText="Highest Price" style={{fontSize:'12px'}} rightIcon={<ArrowUp />} value="priceDESC"/>
											</SelectField>
										</div>
									</div>	
								</div>
								<ProductGrid productCategoryId={productCategoryId} brandId={brandId} minAmount={minAmount} maxAmount={maxAmount} sortOrder={sortOrder} search={search} style={{padding:'10px'}}/>
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
	query,
	productBrandQuery,
	productCategorybyIdQuery
)(ProductBrowser);

export default ({params})=>{
	let {id} = params ? params: {};
	return (<TheComponet productCategoryId={id} parentCategoryId={null} id={id} page={1}/>)
}