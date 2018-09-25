import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {List,ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SmartPhone from 'material-ui/svg-icons/hardware/smartphone';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import query from '../apollo/ProductCategory';
import propTypes from 'material-ui/utils/propTypes';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import CategoryCard from './CategoryCard';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import {withRouter} from 'react-router';
import { Avatar } from 'material-ui';

class CategoryMenu extends React.Component{
	constructor(){
		super(...arguments);
		this.state = {
			anchorEl:null,
			childItems:[],
			parentName:'',
			open:false,
			subMenuFocus:false
		}
	}
	
	static propTypes = {
		anchorOrigin: propTypes.origin,
		targetOrigin: propTypes.origin
	};

	componentDidMount(){
		this.setState({anchorEl:ReactDOM.findDOMNode(this.refs.menuItem)});
	}
	// componentWillReceiveProps({loading,updateLoadingStatus}){
	// 	if(loading !== this.props.loading){
	// 		updateLoadingStatus(loading);
	// 	}
	// }
	// componentDidUpdate(prevProps){
	// 	let {ProductCategory} = this.props;
	// 	if(prevProps.ProductCategory!== ProductCategory){
	// 		const scrollable = document.getElementsByClassName('scrollable');
	// 		for(let i=0; i<scrollable.length;i++){
// 			scrollable[0].scrollTop=0;
	// 		}
	// 	}
	// }
	render(){
		let {ProductCategory,router,targetOrigin,anchorOrigin,className} = this.props;
		          
		return (
				<div ref="menuItem" style={{height:'100%'}}  onMouseLeave={()=>{
					setTimeout(() => {
						this.setState({open:false})
					}, 0);
				}}>
					{/* <div className="catHead" ref="menuItem">Category</div> */}
					<div className={className}>
					{
						ProductCategory? ProductCategory.map(p=>(<ListItem key={p.id} style={{height:'40px'}} leftAvatar={<Avatar src={p.Thumb} size={25} />} primaryText={p.Name} rightIcon={className === "row" ? <ArrowDown/> : <ArrowDropRight />} onMouseEnter={()=>{this.setState({open:true,parentName:p.Name,childItems:p.SubCategories ? p.SubCategories : []});}}
						 className="CatItem" height={25} onClick={()=>{router.push(`/Product/${p.id}`);this.setState({open:false});}}
						/>)):null
					}				

	{/* ProductCategory? ProductCategory.map(p=>(<MenuItem key={p.id} value={p.id} primaryText={p.Name} onClick={()=>{router.push(`/Product/${p.id}`)}}
							menuItems={p.items ? p.items.map(q=>(<MenuItem key={q.id} value={p.id} primaryText={q.Name} onClick={()=>{router.push(`/Product/${q.id}`)}}
								menuItems={p.items ? p.items.map(r=>(<MenuItem key={r.id} value={r.id} primaryText={r.Name} onClick={()=>{router.push(`/Product/${r.id}`)}}/>)) : null }
							/>)) : null }
						/>)):null
						*/}
					</div>
					<Popover
						canAutoPosition={false}
						targetOrigin={targetOrigin}
						anchorOrigin={anchorOrigin}
						popoverProps={{style:{height:'400px',width:'800px'}}}
						open={this.state.open}
						anchorEl={this.state.anchorEl}
						useLayerForClickAway={false}
					>
					<div style={{width:'800px',height:'400px',marginLeft:'20px'}} onMouseEnter={()=>{this.setState({open:true});}} onMouseLeave={()=>{this.setState({open:false});}}>
						{/* <div style={{width:'100%',textAlign:'center',fontSize:'18px',color:'darkblue',fontStyle:'bold'}}>{this.state.parentName}</div> */}
						<div className="row">
						{
							this.state.childItems ? this.state.childItems.map((i)=>(<CategoryCard key={i.id} ProductCategory={i} onClosePopup={()=>{this.setState({open:false});}} style={{width:'150px',height:'100px'}}/>)) : null
						}
						</div>
					</div>
						{/* {
							this.state.childItems ? this.state.childItems.map((i)=>(<div key={i.id}>{i.Name}</div>)) : null
						} */}
					</Popover>
				</div>
				// <Paper className="col-auto" className="fullheight" style={style}>
                //     <Menu desktop={true} width={200}>	
                //     {
                //         ProductCategory? ProductCategory.map(p=>(<MenuItem key={p.id} primaryText={p.Name} onClick={()=>{router.push(`/Product/${p.id}`)}}/>)):null
                //     }
                //     </Menu>		
				// </Paper>
			);
	}
}



const TheComponent= compose(
        withRouter,
		query
	)(CategoryMenu);

export default (props)=>{
	return (<TheComponent {...props} page={1} pageSize={20}/>);
}