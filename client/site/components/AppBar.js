import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import {Toolbar,ToolbarGroup,ToolbarTitle} from 'material-ui/Toolbar';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ActionSearch from 'material-ui/svg-icons/action/search';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import CommuKey from 'material-ui/svg-icons/communication/vpn-key';
import ActionShop from 'material-ui/svg-icons/action/shopping-cart';
import ActionHome from 'material-ui/svg-icons/action/home';
import {gray, blue200, blue900} from 'material-ui/styles/colors';
import {blue100} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import AppButton from 'material-ui/svg-icons/navigation/apps';
import OrderIcon from 'material-ui/svg-icons/notification/event-note';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Drawer from 'material-ui/Drawer';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import React from 'react';
import {logout} from '../../auth';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import Favicon from 'react-favicon';
import {searchProductByKeyWord} from '../apollo/Product';
import query from '../apollo/ProductCategory';
import AutoComplete from '../../common/AutoComplete';
import {withRouter} from 'react-router';
import { userInfo } from 'os';
import CategoryMenu from './CategoryMenu';
import Menu from 'material-ui/Menu';
import { MenuItem } from 'material-ui/MenuItem';

class AppBar extends React.Component{
	constructor(){
		super(...arguments);
		this.dataSourceConfig = {
            text: 'Alias',
            value: 'id',
            secondaryText:'Name',
            avatar:'DefaultPhotoThumbUrl'
        };
        this.state={
			open:false,
			openAccount:false,
			openSearch:false,
			openCategory:false,
			searchText:''
        }
	}
	queryDataForAutoComplete(searchText){
        let {searchProductByKeyWord,onSearchChange} = this.props;
        this.setState({searchText});
        searchProductByKeyWord(searchText,20);
	}
	
	handleClick = (event) => {
		// This prevents ghost click.
		event.preventDefault();
	
		this.setState({
		  open: true,
		  anchorEl: event.currentTarget,
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};

	handleCategoryClick = (event) => {
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			openCategory: true,
			anchorEl: event.currentTarget,
		});
	};

	handleAccountRequestClose = () => {
		this.setState({openAccount:false});
	}
	
	handleCategoryRequestClose = () => {
		this.setState({
			openCategory: false,
		});
	};

	handleSearchClick = (event) => {
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			openSearch: true,
			anchorEl: event.currentTarget,
		});
	};
	
	handleSearchRequestClose = () => {
		this.setState({
			openSearch: false,
		});
	};

	render(){
		let {muiTheme,onSearchChange,onSearchModeChange,isSearchMode,title,toggleDrawer,onFilterDrawerToggle,productSearchResult,searchingProductByKeyWord,router,userProfile,cartItems,ProductCategory,resetUserProfile} = this.props;
		let {userName} = userProfile? userProfile : {};
		let {searchText} = this.state;
		let cartItemsCount = cartItems? cartItems.length: 0;
	// let searchBar = <Toolbar style={{height:'100px',backgroundColor:muiTheme.palette.primary1Color}}>
	//     <ToolbarGroup style={{width:'100%'}} firstChild={true}>
	//     	<img src="http://res.cloudinary.com/djir3ki08/image/upload/v1517590917/phoewa-yote_owpgih.png" style={{width:"120px",height:'120px'}}/>
	//         <AutoComplete
	// 	        textFieldStyle={{width:'100%'}}
	// 	        style={{width:'80%',backgroundColor:'#fff',padding:'0 8px 0 8px',borderRadius:'4px',marginTop:'5px',marginBottom:'5px'}}
	// 	        hintText="Search By Product Name And Description"
	// 	        searchText={searchText}
	// 	        onUpdateInput={this.queryDataForAutoComplete.bind(this)}
	// 	        onNewRequest={(item)=>{router.push(`/Product/${item.id}`)}}
	// 	        dataSource={productSearchResult? productSearchResult:[]}
	// 	        dataSourceConfig={this.dataSourceConfig}
	// 	        loading={searchingProductByKeyWord}
	// 	        filter={AutoComplete.noFilter}
	// 	        openOnFocus={false}
	// 	        id="searchProduct"
	// 	        name="searchProduct"
	// 	        targetOrigin={{vertical:'top',horizontal:'left'}}
	// 	        anchorOrigin={{vertical:'bottom',horizontal:'left'}}
	// 	        fullWidth={true}
	// 	        popoverProps={{style:{height:'90%'}}}
	//     	/>
    //         <IconButton touch={true} style={{background:'gray',borderRadius:'5px'}}>
	//             <ActionSearch color={white} />
	//         </IconButton>
	//     </ToolbarGroup>
    //     <ToolbarGroup lastChild={true}>
    //         <Badge
    //             badgeContent={0}
    //             primary={true}
    //             badgeStyle={{top: 15, right: 15,background:'gray'}}
    //             style={{marginRight:'20px',marginLeft:'20px'}}
    //             >
    //             <IconButton tooltip="ShoppingCart" touch={true} >
    //                 <ActionShop color={white}/>					
    //             </IconButton>				
    //         </Badge>
	// 		<div className="row">
	// 			{userName ? userName : ''}
	// 			{userName ? 
	// 				<FlatButton
	// 				onClick={()=>{logout();window.location="/login"}}
	// 				labelPosition="before"
	// 				label="LogOut"
	// 				style={{color:'white'}}
	// 				primary={true}
	// 				icon={<SocialPerson color={white}/>}
	// 				/>
	// 				:
	// 				<FlatButton
	// 				onClick={()=>{window.location="/login"}}
	// 				labelPosition="before"
	// 				label="LogIn"
	// 				style={{color:'white'}}
	// 				primary={true}
	// 				icon={<SocialPerson color={white}/>}
	// 				/>
	// 			}
	// 		</div>
					
									
    //     </ToolbarGroup>
	// </Toolbar>;

	let searchBar = 
	<div className="container">
		{/* <div className="row justify-content-center">
			<div className="col-3">
				<img className="img-responsive" src="https://res.cloudinary.com/djir3ki08/image/upload/v1517590917/phoewa-yote_owpgih.png" style={{width:"100px",height:'80px'}} />										
			</div>
		</div> */}
		<div className="row justify-content-between">
			<div className="col-xs-12 col-sm-2" style={{cursor:'pointer'}}>				
				<img className="img-responsive" onClick={(e)=>{e.preventDefault();router.push(`/`);}} src="https://res.cloudinary.com/djir3ki08/image/upload/v1517590917/shoppylife1_pxxz0z.png" style={{width:"100px",height:'80px'}} />										
			</div>		
			<div className="col-xs-12 col-sm-10">				
				<div className="row justify-content-between">
					<div className="col-xs-2 d-block d-sm-none">
						<IconButton
							onClick={toggleDrawer}
							style={{background:'white',marginLeft:'5px',marginTop:'20px',marginBottom:'15px'}}
							>
							<ViewList width='100%' height='100%' color='blue'/>
						</IconButton>
					</div>
					<div className="d-none d-sm-block col-sm-6 col-md-7 col-lg-8 col-xl-9">
						<AutoComplete
							textFieldStyle={{width:'100%'}}
							style={{width:'100%',backgroundColor:'white',border:'1px solid',borderRadius:'10px',marginTop:'20px',marginBottom:'15px',padding:'0 8px 0 8px',borderRadius:'4px'}}
							hintText="Search Product"
							searchText={searchText}
							onUpdateInput={this.queryDataForAutoComplete.bind(this)}
							onNewRequest={(item)=>{router.push(`/detail/${item.id}`)}}
							dataSource={productSearchResult? productSearchResult:[]}
							dataSourceConfig={this.dataSourceConfig}
							loading={searchingProductByKeyWord}
							filter={AutoComplete.noFilter}
							openOnFocus={false}
							id="searchProduct"
							name="searchProduct"
							targetOrigin={{vertical:'top',horizontal:'left'}}
							anchorOrigin={{vertical:'bottom',horizontal:'left'}}
							fullWidth={true}
							popoverProps={{style:{height:'90%'}}}
						/>
					</div>
					<div className="col-xs-2 d-block d-sm-none">
						<IconButton
							onClick={this.handleSearchClick}
							style={{background:'white',marginLeft:'5px',marginTop:'25px',marginBottom:'15px'}}							>
							<ActionSearch width='100%' height='100%' color='blue'/>
						</IconButton>
					</div>
					<div className="col-xs-2 col-sm-2 col-md-2 col-lg-1">
						<Badge
							badgeContent={cartItemsCount}
							badgeStyle={{top: 20, right: 20,color:'white',background:cartItemsCount==0? 'white':'Mediumblue'}}
							style={{marginRight:'5px',marginLeft:'5px'}}
							onClick={()=>{router.push("/checkout/cart");}}
							>
							<IconButton tooltip="ShoppingCart" touch={true} >
								<ActionShop color={blue900}/>					
							</IconButton>				
						</Badge>
					</div>
					<div className="col-xs-4 col-sm-3">
						<FlatButton
							//onMouseOver={(event)=>{this.setState({openAccount:true,anchorEl:event.currentTarget,});}}
							// onMouseLeave={(event)=>{this.setState({openAccount:false});}}
							onClick={(event)=>{this.setState({openAccount:true,anchorEl:event.currentTarget});}}
							labelPosition="after"
							labelStyle={{paddingRight:'2px'}}
							label={userName ? userName : 'My Account'}
							style={{background:'white',marginTop:'30px',marginBottom:'15px',width:'100%'}}
							icon={<SocialPerson color={blue900}/>}
							/>
					</div>
				</div>
			</div> 
  		</div>
		<Popover
			open={this.state.openAccount}
			anchorEl={this.state.anchorEl}
			style={{width:'150px'}}
			//onMouseOver={(event)=>{this.setState({openAccount:true});}}
			anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			targetOrigin={{horizontal: 'left', vertical: 'top'}}
			// onMouseLeave={()=>{
			// 	setTimeout(() => {
			// 		this.setState({openAccount:false})
			// 	}, 0);
			// }}
			onRequestClose={this.handleAccountRequestClose}>			
				{userName ? 
					<div>
						<FlatButton
							onClick={()=>{window.location="/customer/order"}}
							labelPosition="after"
							label="My Orders"
							style={{color:'blue',width:'100%'}}
							icon={<OrderIcon color={blue900}/>}
							/><br/>
						<FlatButton
							onClick={()=>{logout();resetUserProfile();}}
							labelPosition="after"
							label="Log Out"
							style={{color:'black',width:'100%'}}
							icon={<CommuKey color={blue900}/>}
							/> 
					</div>:
					<div>
						<FlatButton
							onClick={()=>{window.location="/customer/register"}}
							labelPosition="after"
							label="Register"
							style={{color:'blue',width:'100%'}}
							icon={<SocialPersonAdd color={blue900}/>}
							/><br/>
						<FlatButton
							onClick={()=>{window.location="/customer/login"}}
							//onClick={()=>{this.props.openLoginDialog();this.setState({openAccount:false})}}
							labelPosition="after"
							label="Log In"
							style={{color:'blue',width:'100%'}}
							icon={<CommuKey color={blue900}/>}
							/><br/>
					</div>
				}			
		</Popover>
		{/* <Drawer 
			open={this.state.openCategory}
			docked={false}
			width={200}
			onRequestChange={(open) => this.setState({openCategory:open})}
		>
			<div className="layout">
				<div style={{height:'168px',backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}}>
					<div className="layout fullheight" >
						<div className="fullheight" style={{padding:'23px 0 0 15px'}}>
							Helo
						</div>					
					</div>
				</div>
				<Menu>
				{
					ProductCategory ? ProductCategory.map(({id,Name},index)=>{
						<MenuItem value={id} primaryText={Name} key={index} onClick={()=>{router.route(`/Product/${id}`);this.setState({openCategory:false})}}></MenuItem>
					}):null
				}
				</Menu>
			</div>
        </Drawer> */}
		<Popover
			open={this.state.openCategory}
			anchorEl={this.state.anchorEl}
			style={{width:'300px'}}
			anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			targetOrigin={{horizontal: 'left', vertical: 'top'}}
			onRequestClose={this.handleCategoryRequestClose}>
			{/* <CategoryMenu /> */}
		</Popover>
		<Popover
			open={this.state.openSearch}
			anchorEl={this.state.anchorEl}
			style={{width:'300px',borderRadius:'4px'}}
			anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
			targetOrigin={{horizontal: 'right', vertical: 'top'}}
			onRequestClose={this.handleSearchRequestClose}>			
				<AutoComplete
					textFieldStyle={{width:'100%'}}
					style={{width:'100%',backgroundColor:'gray',margin:'5px',padding:'0 8px 0 8px',borderRadius:'4px'}}
					hintText="Search Product"
					searchText={searchText}
					onUpdateInput={this.queryDataForAutoComplete.bind(this)}
					onNewRequest={(item)=>{router.push(`/detail/${item.id}`)}}
					dataSource={productSearchResult? productSearchResult:[]}
					dataSourceConfig={this.dataSourceConfig}
					loading={searchingProductByKeyWord}
					filter={AutoComplete.noFilter}
					openOnFocus={false}
					id="searchProduct"
					name="searchProduct"
					targetOrigin={{vertical:'top',horizontal:'left'}}
					anchorOrigin={{vertical:'bottom',horizontal:'left'}}
					fullWidth={true}
					popoverProps={{style:{height:'90%'}}}
				/>
			
		</Popover>
	</div>

	// let toolBar = <div className="row" style={{background:muiTheme.palette.primary1Color}}>
	// 		<Chip
    //             style={{width:'20%',marginLeft:'20px',marginRight:'30px'}}
    //             onClick={()=>{router.push("/")}}
    //             >
    //             <Avatar style={{width:'100%'}} src="http://res.cloudinary.com/djir3ki08/image/upload/v1517590917/phoewa-yote_owpgih.png" /> 
	// 			<span style={{fontSize:'14px',color:'gray',fontStyle:'Bold'}}>Phoewa</span>
    //         </Chip>
	// 		<div style={{width:'60%'}}>
	// 			<AutoComplete
	// 				textFieldStyle={{width:'100%'}}
	// 				style={{width:'100%',backgroundColor:'#fff',padding:'0 8px 0 8px',borderRadius:'4px',marginTop:'5px',marginBottom:'5px'}}
	// 				hintText="Search products"
	// 				searchText={searchText}
	// 				onUpdateInput={this.queryDataForAutoComplete.bind(this)}
	// 				onNewRequest={(item)=>{router.push(`/Product/${item.id}`)}}
	// 				dataSource={productSearchResult? productSearchResult:[]}
	// 				dataSourceConfig={this.dataSourceConfig}
	// 				loading={searchingProductByKeyWord}
	// 				filter={AutoComplete.noFilter}
	// 				openOnFocus={false}
	// 				id="searchProduct"
	// 				name="searchProduct"
	// 				targetOrigin={{vertical:'top',horizontal:'left'}}
	// 				anchorOrigin={{vertical:'bottom',horizontal:'left'}}
	// 				fullWidth={true}
	// 				popoverProps={{style:{height:'90%'}}}
	// 			/>
	// 			<IconButton touch={true} style={{background:'gray',borderRadius:'5px'}}>
	// 				<ActionSearch color={white} />
	// 			</IconButton>
	// 		</div>
	// 		<div style={{width:'20%'}}>
	// 			<Badge
	// 				badgeContent={10}
	// 				primary={true}
	// 				badgeStyle={{top: 15, right: 15,background:'gray'}}
	// 				style={{marginRight:'20px',marginLeft:'20px'}}
	// 				>
	// 				<IconButton tooltip="ShoppingCart" touch={true} >
	// 					<ActionShop color={white}/>					
	// 				</IconButton>				
	// 			</Badge>
	// 			<FlatButton
	// 				onClick={()=>{router.push("/login");}}
	// 				labelPosition="before"
	// 				label="LogIn"
	// 				style={{color:'white'}}
	// 				primary={true}
	// 				icon={<SocialPerson color={white}/>}
	// 				/>
	// 		</div>
	// 	</div>;

	return (		
	    <Paper zDepth={3} style={{zIndex:1}}>
	    	{/* <Favicon url="../../../public/img/favicon.ico" /> */}
	        {searchBar}
	    </Paper>
	);
	}
}
	const TheComponent=  compose(
		connect(
			state=>
			({userProfile:state.UserProfile,cartItems:state.ProductDetail.cart.items}),
			// {
			// 	let {search,isSearchMode} = state.ProductBrowser;
			// 	return {search,isSearchMode};
			// },
			dispatch=>({
				resetUserProfile:()=>{
					dispatch({type:'USER_PROFILE_RESET'});
				},
				// onSearchModeChange:mode=>{
				// 	if(mode)
				// 		dispatch({type:'PRODUCT_BROWSER_SHOW_SEARCH'});
				// 	else
				// 		dispatch({type:'PRODUCT_BROWSER_HIDE_SEARCH'});
				// },
				// onSearchChange:search=>{
				// 	dispatch({type:'PRODUCT_BROWSER_SEARCH',search});
				// },
				toggleDrawer:()=>{
					dispatch({type:'SITE_NAV_DRAWER_TOGGLE'});
				},
				openLoginDialog:()=>{
					dispatch({type:'LOGIN_DIALOG_OPEN'});
				}
			})
			),
		query,
		searchProductByKeyWord,
		withRouter,
			muiThemeable()
		)(AppBar);

export default (props)=>{
    return (<TheComponent limit={10} keyWord="" {...props}/>);
}
	