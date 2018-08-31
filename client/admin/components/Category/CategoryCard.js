import React from "react";
import {compose} from "react-apollo";
import {connect} from "react-redux";
import {Card,CardHeader,CardActions} from "material-ui/Card";
import {deleteProductCategoryMutation} from "../../apollo/ProductCategory";
import FlatButton from "material-ui/FlatButton";
import CategoryDialog from "./CategoryDialog";
class CategoryCard extends React.Component{
    constructor(){
        super(...arguments);
        this.state ={
            open:false
        };
    }

    destroy(){
        let {deleteProductCategory,id} = this.props;
        deleteProductCategory({variables:{id}});
    }

    render(){

        let {id,ParentCategoryId,Name} = this.props;

        return(
            <div className="col-lg-2  col-sm-4 col-xs-12">
                <CategoryDialog open={this.state.open} onRequestClose={()=>{this.setState({open:false});this.props.editCategory({id:null,ParentCategoryId:null,Name:''})}} />
                <Card>
                    <CardHeader title={Name} subtitle={Name} />
                    <CardActions>
                        <FlatButton label="Edit" onClick={()=>{this.setState({open:true});this.props.editCategory({id,ParentCategoryId,Name})}} style={{width:'100px'}}/>,
                        <FlatButton label="Delete" onClick={this.destroy.bind(this)} style={{width:'100px'}}/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default compose(
    deleteProductCategoryMutation,
    connect(
        state=>({}),
        dispatch=>({
            editCategory:(edit)=>{
                dispatch({type:'CATEGORY_EDIT',edit});
            }
        })
    )  
) (CategoryCard);