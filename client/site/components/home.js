import React from 'react';
import ReactDOM from 'react-dom';
import {graphql,compose} from 'react-apollo';
import {connect} from 'react-redux';
import {GridList,GridTile} from 'material-ui/GridList';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import gql from 'graphql-tag';
import Waypoint from 'react-waypoint';
import loader from '../../common/Loader';
import AppBar from './AppBar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import CategoryGrid from './CategoryGrid';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './Product/ProductGrid';
import FooterBar from './FooterBar';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import productQuery from '../apollo/Product';
import ProductCard from './Product/ProductCard';
import AppFooter from './AppFooter';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { FloatingActionButton } from 'material-ui';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { blue600 } from 'material-ui/styles/colors';
//import ChatPopup from './ChatPopup';
//import AppBar from 'material-ui/AppBar';

class Home extends React.Component{
	render(){
		let {muiTheme,productCategoryId,Product} = this.props;
		const styles = {
			root: {
			  display: 'flex',
			  flexWrap: 'wrap',
			  justifyContent: 'space-around',
			},
			gridList: {
			  display: 'flex',
			  flexWrap: 'nowrap',
			  overflowX: 'auto',
			},
			titleStyle: {
			  color: 'rgb(0, 188, 212)',
			},
		  };

		return(
				<div className="layout fullheight">
					<AppBar title="Home Screen"/>									
					{/* <FloatingActionButton ref="chatButton" style={{margin: 0,top: 'auto',right: 20,bottom: 20,left: 'auto',position: 'fixed'}} 
						backgroundColor={blue600} onClick={()=>{this.props.setChatPopupTarget(ReactDOM.findDOMNode(this.refs.chatButton));this.props.onPopoverToggle()}}>
						{this.props.chatOpen ? <CloseIcon /> : <ChatIcon />}
					</FloatingActionButton>	 */}
					<div className="fullheight scrollable">
						<div className="row justify-content-md-center">	
							<div className="col-sm-3 d-none d-sm-block" style={{height:'300px'}}>
								<CategoryMenu style={{height:'300xp',width:'100%',marginRight:'10px'}} className="fullheight scrollable" targetOrigin={{vertical:'top',horizontal:'left'}} anchorOrigin={{vertical:'top',horizontal:'right'}}  parentCategoryId={null} />
							</div>	
							<div id="carouselExampleIndicators" className="col-sm-9 carousel slide" data-ride="carousel">
								<ol className="carousel-indicators">
									<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
									<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
									<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
								</ol>
								<div className="carousel-inner">
									<div className="carousel-item active">									
										<img src="https://res.cloudinary.com/djir3ki08/image/upload/v1517309052/maxresdefault_z90bmy.jpg" alt="First slide" style={{width:'100%',height:'300px'}}/>
									</div>
									<div className="carousel-item">
										<img src="https://res.cloudinary.com/djir3ki08/image/upload/v1517309052/sample.jpg" alt="Second slide" style={{width:'100%',height:'300px'}}/>
									</div>
									<div className="carousel-item">
										<img src="https://res.cloudinary.com/djir3ki08/image/upload/v1519099771/galaxy_s5_iulzid.jpg" alt="Third slide" style={{width:'100%',height:'300px'}}/>
									</div>
								</div>
								<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
									<span className="carousel-control-prev-icon" aria-hidden="true"></span>
									<span className="sr-only">Previous</span>
								</a>
								<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
									<span className="carousel-control-next-icon" aria-hidden="true"></span>
									<span className="sr-only">Next</span>
								</a>
							</div>													
							{/* <div id="myCarousel" className="col-sm-9 carousel slide" data-ride="carousel">							
								<ol className="carousel-indicators">
									<li data-target="#myCarousel" data-slide-to="0" className="active"></li>
									<li data-target="#myCarousel" data-slide-to="1"></li>
									<li data-target="#myCarousel" data-slide-to="2"></li>
								</ol>

								
								<div className="carousel-inner">
``									<div className="item active">
										<img src="https://res.cloudinary.com/djir3ki08/image/upload/v1517309052/maxresdefault_z90bmy.jpg" alt="Los Angeles" style={{width:'100%',height:'300px'}}/>
									</div>

									<div className="item">
										<img src="https://res.cloudinary.com/djir3ki08/image/upload/v1496649890/sample.jpg" alt="Chicago" style={{width:'100%',height:'300px'}}/>
									</div>
									
									<div className="item">
										<img src="https://res.cloudinary.com/djir3ki08/image/upload/v1519099771/galaxy_s5_iulzid.jpg" alt="New york" style={{width:'100%',height:'300px'}}/>
									</div>
								</div>

								<a className="left carousel-control" href="#myCarousel" data-slide="prev">
									<span className="carousel-control-prev-icon"></span>
								</a>
								<a className="right carousel-control" href="#myCarousel" data-slide="next">
									<span className="carousel-control-next-icon"></span>
								</a>							
							</div> */}
						</div>	
						<div className="layout fullheight"
							style={{flexWrap:'nowrap'}}>
								<h2>Top Products</h2>
								<div style={styles.gridList}>
								{
									Product ? Product.map((p)=>(
									<ProductCard key={p.id} Product={p} style={{width:'auto'}} />)) : ''
								}
								</div>
								<div style={{width:'200px',height:'60px'}}>
									<MessengerCustomerChat
										pageId="549458708738758"
										appId="168492710596978"
										/>
								</div>
						</div>
						

						
											
						
						
						{/* <footer style={{height:'200px'}} className="row" id="footer">
							<div style={{position:'fixed',marginLeft:'0px',width:'100%',textAlign:'center',backgroundColor:muiTheme.palette.primary1Color}}>
								<span style={{width:'100%',textAlign:'center',fontSize:'14px',color:'white'}}>© 2018 - Phoewa Online Shopping. All rights reserved</span>
							</div>	
						</footer>			 */}
						<FooterBar	/>
					</div>														
				</div>
					
			);
	}

}


const TheComponet = compose(
	connect(
		state=>({chatOpen:state.Site.isChatPopoverOpen}),
		dispatch=>({
            onPopoverToggle:()=>{
                dispatch({type:'CHAT_POPOVER_TOGGLE'});
			},
			setChatPopupTarget:(target)=>{
                dispatch({type:'CHAT_POPOVER_TARGET',target});
            }
		})
	),
	muiThemeable(),
	productQuery
)(Home);

export default ({params})=>{
	let {id} = params ? params: 1;
	return (<TheComponet productCategoryId={id}/>)
}
