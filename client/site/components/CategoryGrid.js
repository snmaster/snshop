import React from 'react';
import query from '../apollo/ProductCategory';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import CategoryCard from './CategoryCard';
import FlatButton from 'material-ui/FlatButton';

class CategoryGrid extends React.Component{
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
		let {ProductCategory} = this.props;

		const styles = {
			gridList: {
			  display: 'flex',
			  flexWrap: 'nowrap',
			  overflowX: 'auto',
			}
		  };

		return (
				<div className="col-auto d-none d-sm-block">
					
					{/* <div className="scrollable grid"> */}
					{/* <div style={styles.gridList}> */}
						{
							ProductCategory? ProductCategory.map(p=>(<CategoryCard key={p.id} ProductCategory={p}/>)):null
						}
					{/* </div> */}
					{/* </div> */}
					{/* <div style={{justifyContent:'center',alignItems:'center'}} className="row">
						{hasMore? <FlatButton style={{margin:'0 auto'}} label="More" onClick={()=>{loadMore(page+1);}}/>:null}
					</div> */}
				</div>
			);
	}
}



const TheComponent= compose(
		query
	)(CategoryGrid);

export default (props)=>{
	return (<TheComponent {...props} page={1} pageSize={20}/>);
}