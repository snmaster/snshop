import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right';
import SmartPhone from 'material-ui/svg-icons/hardware/smartphone';
import query from '../apollo/ProductCategory';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import CategoryCard from './CategoryCard';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import {withRouter} from 'react-router';

class CategoryMenu extends React.Component{
	constructor(){
		super(...arguments);
		this.state = {
			anchorEl:null,
			childItems:[],
			open:false,
			subMenuFocus:false
		}
	}
	// componentDidMount(){
	// 	let {updateLoadingStatus,loading} = this.props;
	// 	updateLoadingStatus(loading);
	// }
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
		let {ProductCategory,router} = this.props;
		          
		return (
				<div>
					<div className="fullheight scrollable" ref="menuItem">
					{
						ProductCategory? ProductCategory.map(p=>(<FlatButton key={p.id} value={p.id} label={p.Name} onMouseEnter={()=>{this.setState({open:true,anchorEl:ReactDOM.findDOMNode(this.refs.menuItem),childItems:p.SubCategories ? p.SubCategories : []});}}
						onMouseLeave={()=>{this.setState({open:false});}} style={{width:'100%'}} onClick={()=>{router.push(`/Product/${p.id}`)}}
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
						targetOrigin={{vertical:'top',horizontal:'left'}}
						anchorOrigin={{vertical:'top',horizontal:'right'}}
						popoverProps={{style:{height:'400px',width:'800px'}}}
						open={this.state.open}
						anchorEl={this.state.anchorEl}
						useLayerForClickAway={false}
						//onRequestClose={this.handleRequestClose}
					>
					<div style={{width:'800px',height:'400px'}} onMouseEnter={()=>{if(!this.state.open)this.setState({open:true})}} onMouseLeave={()=>{if(this.state.open)this.setState({open:false});}} >
						<div className="row">
						{
							this.state.childItems ? this.state.childItems.map((i)=>(<CategoryCard key={i.id} ProductCategory={i} style={{width:'150px',height:'100px'}}/>)) : null
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