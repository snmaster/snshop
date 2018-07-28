import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import query from '../apollo/ProductCategory';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import CategoryCard from './CategoryCard';
import FlatButton from 'material-ui/FlatButton';
import {withRouter} from 'react-router';

class CategoryMenu extends React.Component{
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
		const style = {
			display: 'inline-block',
			margin: '16px 32px 16px 10px',
			width:'100%',
			height:'100%',
			padding:'20px'
		  };
          
		return (
				<div className="fullheight scrollable">
				{
					ProductCategory? ProductCategory.map(p=>(<CategoryCard key={p.id} ProductCategory={p} />)):null
				}
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