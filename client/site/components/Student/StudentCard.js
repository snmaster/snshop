import React from 'react';
import {Card,CardTitle} from 'material-ui/Card';
import {connect} from 'react-redux';

class StudentCard extends React.Component{

	render(){
		let {Student,selectedId,selectStudent} = this.props;
		let {id,Name,Gender,FatherName} = Student ? Student : {};

		return(
				<div style={{padding:'4px'}} onClick={()=>{selectStudent(id);}}>
					<Card style={{padding:'3px',backgroundColor:id===selectedId? '#e3e3e3' : null}}>
						<CardTitle title={Name} subtitle={Gender}/>
					</Card>
				</div>
			);
	}
}

export default connect(
	state=>({selectedId:state.Student.selectedId}),
	dispatch=>({
		selectStudent:(id)=>{
			dispatch({type:'STUDENT_SELECT',id});
		}
	})
)(StudentCard);