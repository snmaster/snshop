import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import {Toolbar,ToolbarGroup,ToolbarTitle} from 'material-ui/Toolbar';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ActionSearch from 'material-ui/svg-icons/action/search';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionShop from 'material-ui/svg-icons/action/shopping-cart';
import ActionHome from 'material-ui/svg-icons/action/home';
import {gray, purple200, purple900} from 'material-ui/styles/colors';
import {purple100} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import AppButton from 'material-ui/svg-icons/navigation/apps';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import React from 'react';
import {logout} from '../../auth';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import Favicon from 'react-favicon';
import {searchProductByKeyWord} from '../apollo/Product';
import AutoComplete from '../../common/AutoComplete';
import {withRouter} from 'react-router';
import { userInfo } from 'os';
import CategoryMenu from './CategoryMenu';

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
		let {muiTheme,onSearchChange,onSearchModeChange,isSearchMode,title,toggleDrawer,onFilterDrawerToggle,productSearchResult,searchingProductByKeyWord,router,userProfile,cartItems} = this.props;
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
	<div className="container-fluid">
		{/* <div className="row justify-content-center">
			<div className="col-3">
				<img className="img-responsive" src="https://res.cloudinary.com/djir3ki08/image/upload/v1517590917/phoewa-yote_owpgih.png" style={{width:"100px",height:'80px'}} />										
			</div>
		</div> */}
		<div className="row justify-content-between">
			<div className="col-xs-12 col-sm-3 ml-xs-auto">
				<a href="#" onClick={(e)=>{e.preventDefault();router.push(`/`);}} style={{textDecoration:"none"}}>
					<img className="img-responsive" src="https://res.cloudinary.com/djir3ki08/image/upload/v1517590917/shoppylife_vx8usq.png" style={{width:"100px",height:'80px'}} />						
				</a>	
				{/* <IconButton
					onClick={(e)=>{router.push('/');}}
					className=""
					style={{background:'white',marginLeft:'5px',marginTop:'20px',marginBottom:'15px'}}
					primary={true}>
					<ActionHome width='100%' height='100%' color='purple'/>
				</IconButton> */}
			</div>		
			{/* <div className="hidden-xs">				 */}
			<div className="col-xs-12 col-sm-5 col-md-4 col-lg-3">
				{userName ? 
					<div className="row">
						<div className="col-xs-3 d-block d-sm-none">
							<IconButton
								onClick={this.handleCategoryClick}
								style={{background:'white',marginLeft:'5px',marginTop:'20px',marginBottom:'15px'}}
								primary={true}>
								<ViewList width='100%' height='100%' color='purple'/>
							</IconButton>
						</div>
						<div className="col-xs-3">
							<IconButton
								onClick={this.handleSearchClick}
								style={{background:'white',marginLeft:'5px',marginTop:'20px',marginBottom:'15px'}}
								primary={true}>
								<ActionSearch width='100%' height='100%' color='purple'/>
							</IconButton>
						</div>
						<div className="col-xs-3">
							<Badge
								badgeContent={cartItemsCount}
								primary={true}
								badgeStyle={{top: 20, right: 20,background:cartItemsCount==0? 'white':'MediumPurple'}}
								style={{marginRight:'5px',marginLeft:'5px'}}
								onClick={()=>{router.push("/cart");}}
								>
								<IconButton tooltip="ShoppingCart" touch={true} >
									<ActionShop color={purple900}/>					
								</IconButton>				
							</Badge>
						</div>
						{/* <div className="col-md-3 col-sm-2" style={{fontSize:'14px',height:'15px',marginTop:'30px',marginBottom:'15px',width:'80px'}}>
							{userName ? userName : ''}
						</div> */}	
						<div className="col-xs-3">
							<FlatButton
								onClick={()=>{logout();window.location="/login"}}
								labelPosition="after"
								label="Log Out"
								style={{color:'black',marginTop:'25px',marginBottom:'15px'}}
								primary={true}
								icon={<SocialPerson color={purple900}/>}
								/>
							<span style={{marginLeft:'10px'}}>
							{userName ? userName : ''}
							</span>
						</div>
					</div>
					:
					<div className="row">
						<div className="col-xs-3 d-block d-sm-none">
							<IconButton
								onClick={this.handleCategoryClick}
								style={{background:'white',marginLeft:'5px',marginTop:'20px',marginBottom:'15px'}}
								primary={true}>
								<ViewList width='100%' height='100%' color='purple'/>
							</IconButton>
						</div>
						<div className="col-xs-3">
							<IconButton
								onClick={this.handleSearchClick}
								style={{background:'white',marginLeft:'5px',marginTop:'20px',marginBottom:'15px'}}
								primary={true}>
								<ActionSearch width='100%' height='100%' color='purple'/>
							</IconButton>
						</div>
						<div className="col-xs-3">
							<Badge
								badgeContent={cartItemsCount}
								primary={true}
								badgeStyle={{top: 20, right: 20,background:cartItemsCount==0? 'white':'MediumPurple'}}
								style={{marginRight:'5px',marginLeft:'5px'}}
								onClick={()=>{router.push("/cart");}}
								>
								<IconButton tooltip="ShoppingCart" touch={true} >
									<ActionShop color={purple900}/>					
								</IconButton>				
							</Badge>
						</div>
						{/* <div className="col">
							<FlatButton
								onClick={()=>{window.location="/Register"}}
								labelPosition="before"
								label="Register"
								style={{color:'purple',marginTop:'25px',marginBottom:'15px'}}
								primary={true}
								/>
						</div> */}
						<div className="col-xs-3">
							<FlatButton
								onClick={()=>{window.location="/login"}}
								labelPosition="after"
								label="Log In"
								style={{color:'purple',marginTop:'25px',marginBottom:'15px'}}
								primary={true}
								icon={<SocialPerson color={purple900}/>}
								/>
						</div>						
					</div>
					
				}
			</div> 
			{/* <div className="hidden-xs hidden-md hidden-sm hidden-lg">
				<IconButton
					onClick={this.handleClick}
					style={{background:'white',marginLeft:'15px',marginTop:'20px',marginBottom:'15px'}}
					primary={true}>
					<AppButton width='100%' height='100%' color='purple'/>
				</IconButton>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
					animation={PopoverAnimationVertical}
					>
					{userName ? 
					<div>
						<Badge
							badgeContent={cartItemsCount}
							primary={true}
							badgeStyle={{top: 20, right: 20,background:cartItemsCount==0? 'white':'MediumPurple'}}
							style={{marginRight:'5px',marginLeft:'5px'}}
							onClick={()=>{router.push("/cart");}}
							>
							<IconButton tooltip="ShoppingCart" touch={true} >
								<ActionShop color={purple900}/>					
							</IconButton>				
						</Badge><br/>
						<div style={{fontSize:'14px',height:'15px',marginLeft:'10px',textAlign:'center',marginTop:'5px',marginBottom:'5px',width:'80px'}}>{userName ? userName : ''}</div><br/>
						<FlatButton
							onClick={()=>{logout();window.location="/login"}}
							labelPosition="before"
							label="Log Out"
							style={{color:'black',marginTop:'5px',marginBottom:'5px'}}
							primary={true}
							icon={<SocialPerson color={purple900}/>}
							/>
					</div>
					:
					<div>
						<Badge
							badgeContent={cartItemsCount}
							primary={true}
							badgeStyle={{top: 20, right: 20,background:cartItemsCount==0? 'white':'MediumPurple'}}
							style={{marginRight:'5px',marginLeft:'5px'}}
							onClick={()=>{router.push("/cart");}}
							>
							<IconButton tooltip="ShoppingCart" touch={true} >
								<ActionShop color={purple900}/>					
							</IconButton>				
						</Badge><br/>
						<FlatButton
							onClick={()=>{window.location="/Register"}}
							labelPosition="before"
							label="Register"
							style={{color:'purple',marginTop:'5px',marginBottom:'5px'}}
							primary={true}
							/><br/>
						<FlatButton
							onClick={()=>{window.location="/login"}}
							labelPosition="after"
							label="Log In"
							style={{color:'purple',marginTop:'5px',marginBottom:'5px'}}
							primary={true}
							icon={<SocialPerson color={purple900}/>}
							/>						
					</div>
					
				}
				</Popover>
			</div> */}
  		</div>
		<Popover
			open={this.state.openCategory}
			anchorEl={this.state.anchorEl}
			style={{width:'300px'}}
			anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			targetOrigin={{horizontal: 'left', vertical: 'top'}}
			onRequestClose={this.handleCategoryRequestClose}>
			<CategoryMenu />
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
				}
				// onSearchModeChange:mode=>{
				// 	if(mode)
				// 		dispatch({type:'PRODUCT_BROWSER_SHOW_SEARCH'});
				// 	else
				// 		dispatch({type:'PRODUCT_BROWSER_HIDE_SEARCH'});
				// },
				// onSearchChange:search=>{
				// 	dispatch({type:'PRODUCT_BROWSER_SEARCH',search});
				// },
				// toggleDrawer:()=>{
				// 	dispatch({type:'SITE_NAV_DRAWER_TOGGLE'});
				// }
			})
			),
		searchProductByKeyWord,
		withRouter,
			muiThemeable()
		)(AppBar);

export default (props)=>{
    return (<TheComponent limit={10} keyWord="" {...props}/>);
}
	