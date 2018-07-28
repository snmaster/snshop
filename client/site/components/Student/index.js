import React from 'react';
import {graphql,compose} from 'react-apollo';
import gql from 'graphql-tag';
import Waypoint from 'react-waypoint';
import StudentCard from './StudentCard';
import loader from '../../../common/Loader';
import AppBar from 'material-ui/AppBar';
import StudentDetail from './StudentDetail';

class StudentBrowser extends React.Component{
	render(){
		let {loading,Student,fetchMoreStudent} = this.props;

		let {pagination,List} = Student ? Student : {};

		let {hasMore} = pagination ? pagination : {};

		return(
				<div className="layout fullheight">
					<AppBar title="Student Browser"/>
					<div className="fullheight row"
						style={{flexWrap:'nowrap'}}
					>
						{loading? <Loader/> : null}
						<div className="scrollable fullheight" style={{minWidth:'350px'}}>
						{	
							List ? List.map((item)=><StudentCard key={item.id} Student={item} />) : null

						}
						<Waypoint onEnter={()=>{
								if(hasMore)
									fetchMoreStudent();
							}}

							bottomOffset='-80px' />
						</div>
						<div style={{height:'500px',width:'100%'}}>
							<StudentDetail/>
						</div>
					</div>					
				</div>
			);
	}

}

const STUDENT_QUERY = gql`
query Student($page:Int,$pageSize:Int){
  Student(page:$page,pageSize:$pageSize){
  	pagination{
      page
      pageSize
      hasMore
      totalRows
      totalPages
    }
    List{
      id
      Name
      FatherName
      Gender
      Grade{
        Name
      }
      Branch{
        Name
      }
    }
  }
}
`;

const studentQuery = graphql(
	STUDENT_QUERY,{
		options:()=>{
			return{
				variables:{
					page:1,
					pageSize:10
				}
			};
		},
		props:({data:{Student,loading,refetch,fetchMore}})=>{
			let {pagination} = Student? Student: {};
			let {page,pageSize} = pagination? pagination : {page:1,pageSize:10};
			return{
				loading,
				Student,				
				fetchMoreStudent:()=>{
					return fetchMore({
						variables:{
							page:page+1,
							pageSize
						},
						updateQuery:(preResult,{fetchMoreResult})=>{
							return{
								...preResult,
								Student:{
									...fetchMoreResult.Student,
									List:[...preResult.Student.List,...fetchMoreResult.Student.List]
								}
							};
						}
					});
				}
			};
		}
	}
);

export default compose(
	studentQuery
)(StudentBrowser);