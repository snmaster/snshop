import {default as immutableUpdate} from 'react-addons-update';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

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

export {studentByIdQuery,updateStudentMutation,createStudentMutation};

export default branchQuery;