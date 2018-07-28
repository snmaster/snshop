import React from 'react';
import {graphql,compose} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {initialData} from '../../reducer/Student';
import {default as immutableUpdate} from 'react-addons-update';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class StudentDetail extends React.Component{
	componentWillReceiveProps({Student}){
		if(this.props.Student !== Student && Student){
			let {id,Name,Gender,FatherName,DOB,Address,BranchId,GradeId,ClassId,Branch,Grade} = Student ? Student : {};
			this.props.editStudent({id,Name,Gender,FatherName,DOB,Address,BranchId,GradeId,ClassId,Branch,Grade});
		}		
	}

	handleCreate(){
		this.props.editStudent({id:null,Name:'',Gender:null,FatherName:'',DOB:null,Address:'',BranchId:null,GradeId:null,ClassId:null,Branch:null,Grade:null});
	}

	handleSave(){
		let {updateStudent,createStudent,selectedStudent} = this.props;
		let {id,Name,Gender,FatherName,DOB,Address,BranchId,GradeId,ClassId} = selectedStudent;
		if(id)
			updateStudent(id,{id,Name,Gender,FatherName,DOB,Address,BranchId,GradeId,ClassId});
		else	
			createStudent({
				variables:{
						student:{
							id,Name,Gender,FatherName,DOB,Address,BranchId,GradeId,ClassId
						}
					}
			});
				
				
	}

	render(){
		let {selectedId,selectedStudent,Branches} = this.props;
		let {id,Name,Gender,FatherName,DOB,Address,BranchId,Branch,Grade,GradeId,ClassId} = selectedStudent ? selectedStudent : {};
		let {Grades} = Branch ? Branch : [];
		let {Classes} = Grade ? Grade : [];

		DOB = new Date(DOB);

		return(

				<div className="row">
					<div className="col-xs-6">
						<TextField name="name" hintText="Name" floatingLabelText="Name" id="name" value={Name} onChange={e=>{this.props.editStudent({Name:e.target.value})}}/>
						<br/>
						gender
						<br/>
						<RadioButtonGroup className="row" name="gender" valueSelected={Gender} onChange={(e,value)=>{this.props.editStudent({Gender:value});}}>
							<RadioButton
								value="M"
								label="Male"
								style={{display:'inline',width:'auto',minWidth:'180px'}}
							/>
							<RadioButton
								value="F"
								label="Female"
								style={{display:'inline',width:'auto'}}
							/>
						</RadioButtonGroup>
						<br/>
						<DatePicker name="dob" hintText="Date Of Birth" floatingLabelText="Date Of Birth" id="dob" value={DOB} onChange={(e,d)=>{this.props.editStudent({DOB:d});}} formatDate={(date)=>(date.formatAsShortDate())} />
						<br/>
						<TextField id="FatherName" name="FatherName" hintText="FatherName" floatingLabelText="FatherName" 
							value={FatherName} onChange={e=>{this.props.editStudent({FatherName:e.target.value})}} />
						<br/>
					</div>
					<div className="col-xs-6">
						<SelectField 
							className="col-xs-12"
							id="Branch"
							name="Branch" 
							value={BranchId} 
							onChange={
								(e,index,value)=>{
									this.props.editStudent({Branch:Branches[index],BranchId:Branches ? Branches[index].id: null});
								}
							}
							floatingLabelText="Branch"
							hintText="Branch"
							dropDownMenuProps={
								{
									targetOrigin:{vertical:'bottom',horizontal:'left'},
	                        		anchorOrigin:{vertical:'top',horizontal:'left'}
								}
							}
						>
							{
								Branches? Branches.map(({id,Name},index)=>(<MenuItem value={id} primaryText={Name} key={index}/>)):null
							}
						</SelectField>
						<br/>
						<SelectField 
							className="col-xs-12"
							id="Grade"
							name="Grade" 
							value={GradeId} 
							onChange={
								(e,index,value)=>{
									this.props.editStudent({Grade:Grades[index],GradeId:Grades[index].id});
								}
							}
							floatingLabelText="Grade"
							hintText="Grade"
							dropDownMenuProps={
								{
									targetOrigin:{vertical:'bottom',horizontal:'left'},
	                        		anchorOrigin:{vertical:'top',horizontal:'left'}
								}
							}
						>
							{
								Grades? Grades.map(({id,Name},index)=>(<MenuItem value={id} primaryText={Name} key={index}/>)):null
							}
						</SelectField>
						<br/>
						<SelectField 
							className="col-xs-12"
							id="Class"
							name="Class" 
							value={ClassId} 
							onChange={
								(e,index,value)=>{
									this.props.editStudent({ClassId:Classes[index].id});
								}
							}
							floatingLabelText="Class"
							hintText="Class"
							dropDownMenuProps={
								{
									targetOrigin:{vertical:'bottom',horizontal:'left'},
	                        		anchorOrigin:{vertical:'top',horizontal:'left'}
								}
							}
						>
							{
								Classes? Classes.map(({id,Name},index)=>(<MenuItem value={id} primaryText={Name} key={index}/>)):null
							}
						</SelectField>
						<br/>
						<TextField name="Address" hintText="Address" floatingLabelText="Address" id="Address"
							value={Address} onChange={e=>{this.props.editStudent({Address:e.target.value})}} />						
						<br/>
						<div className="row">
							<FlatButton name="savebutton" label="Save" onClick={this.handleSave.bind(this)} />
							<FlatButton name="createbutton" label="New" onClick={this.handleCreate.bind(this)} />
						</div>
						
					</div>
				</div>
			);
	}
}

const STUDENT_BYID_QUERY = gql`
	query StudentById($id:Int!){
	  Student:StudentById(id:$id){
	    id
	    Name
	    Gender
	    FatherName
	    Address
	    Branch{
	    	id
	    	Name
	    	Grades{
	    		id
	    		Name
	    		Classes{
	    			id
	    			Name
	    		}
	    	}
	    }
	    Grade{
	    	id
	    	Name
	    	Classes{
	    		id
	    		Name
	    	}
	    }
	    ClassId
	    BranchId
	    GradeId
	    DOB
	  }
	}
`;

const studentByIdQuery = graphql(
	STUDENT_BYID_QUERY,{
		options:({selectedId})=>({
				variables:{id:selectedId},
				skip:!selectedId
		}),
		props:({data:{Student,loading,refetch,fetchMore}})=>{
			return{
				loading,
				Student
			};
		}
	}
);

const BRANCH_QUERY = gql`
	query branchQuery{
		Branches:Branch{
			id
			Name
			Grades{
				id
				Name
				Classes{
					id
					Name
				}
			}
		}
	}
`;

const branchQuery = graphql(
	BRANCH_QUERY,{
		props:({data:{Branches,loading,refetch}})=>{
			return {
				loading,
				Branches
			};
		}
	}
);

const UPDATE_STUDENT_MUTATION = gql`
	mutation updateStudentMutation($id:Int!,$student:InputStudent){
		updateStudent(id:$id,student:$student){
			id
		    Name
		    Gender
		    FatherName
		    Address
		    Branch{
		    	id
		    	Name
		    	Grades{
		    		id
		    		Name
		    		Classes{
		    			id
		    			Name
		    		}
		    	}
		    }
		    Grade{
		    	id
		    	Name
		    	Classes{
		    		id
		    		Name
		    	}
		    }
		    ClassId
		    BranchId
		    GradeId
		    DOB
		}
	}
`;

const updateStudentMutation = graphql(UPDATE_STUDENT_MUTATION,{
	props:({mutate})=>{
		return {
			updateStudent:(id,student)=>{
				return mutate({
					variables:{id,student}
				});
			}
		};
	}
});

const INSERT_STUDENT_MUTATION = gql`
	mutation createStudentMutation($student:InputStudent){
		createStudent(student:$student){
			id
		    Name
		    Gender
		    FatherName
		    Address
		    Branch{
		    	id
		    	Name
		    	Grades{
		    		id
		    		Name
		    		Classes{
		    			id
		    			Name
		    		}
		    	}
		    }
		    Grade{
		    	id
		    	Name
		    	Classes{
		    		id
		    		Name
		    	}
		    }
		    ClassId
		    BranchId
		    GradeId
		    DOB
		}
	}
`;

const createStudentMutation = graphql(INSERT_STUDENT_MUTATION,{
	props:({mutate})=>{
		return {
			createStudent:(args)=>{
				args.updateQueries={
					studentQuery:(prev,{mutationResult})=>{
						let mutatedInstance = mutationResult.data.createStudent;
						if(!mutatedInstance)
							return prev;

						let newResult =  immutableUpdate({
							Students:{
								$unshift:[mutatedInstance]
							}
						});

						return newResult;
					}
				};
				return mutate(args);
			}
		};
	}
});

export default compose(
	connect(
		state=>({selectedId:state.Student.selectedId,selectedStudent:state.Student.selectedStudent}),
		dispatch=>({
			editStudent:(edit)=>{
				dispatch({type:'STUDENT_ITEM_EDIT',edit});
			}
		})
	),
	studentByIdQuery,
	branchQuery,
	updateStudentMutation,
	createStudentMutation
)(StudentDetail);