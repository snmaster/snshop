import React from "react";
import {compose} from "react-apollo";
import {connect} from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import TextField from "material-ui/TextField";
import {searchCategoryByKeyWordQuery, saveProductCategoryQuery} from "../../apollo/ProductCategory";
import AutoComplete from "../../../common/AutoComplete";

class CategoryDialog extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {
            loading:false,
            loadingMessage:'',
            category:null,
            categorySearchText:'',
            errorText:''
        };
    }

    saveCategory(){
        let {saveProductCategory,categoryEdit,onRequestClose} = this.props;
        let {id,Name,ParentCategoryId,ImagePath} = categoryEdit ? categoryEdit : {};
        this.setState({loadin:true,loadingMessage:'Saving Category'});
        saveProductCategory({variables:{category:{id,Name,ParentCategoryId,ImagePath}}})
            .then(({data:{saveProductCategory:{instance,errors}}})=>{
                this.setState({loading:false,loadingMessage:''});
                if(instance)
                    onRequestClose();
            });
    }

    queryDataForAutoComplete(searchText){
        let {searchCategoryByKeyWord,limit} = this.props;
        this.setState({categorySearchText:searchText,selectedcategory:null});
        searchCategoryByKeyWord(`%${searchText}%`,limit);
    }

    render(){
        let {open,onRequestClose,dialogCaption,categorySearchResult,searchingCategoryByKeyWord,categoryEdit} = this.props;
        let {id,Name,ParentCategoryId,errors} = categoryEdit ? categoryEdit :{};
        let {loading,loadingMessage,errorText,categorySearchText} = this.state;

        categorySearchResult = categorySearchResult? categorySearchResult: [];

		const dataSourceConfig = {
            text: 'Name',
            value: 'id'
        };
        
        let actions = [
            <div className="row" style={{padding:'10px',display:'inline-block',float:'left'}}>
                {loading ? <CircularProgress size={36} style={{verticalAlign:'middle'}}/> : null} {loading ? <div style={{display:'inline-block'}}>{loadingMessage}</div> : null} <div style={{color:'red'}}>{loading? '': errorText}</div>
            </div>,
            <FlatButton onClick={this.saveCategory.bind(this)} label="Save" icon={<NavigationCheck/>} />,
            <FlatButton onClick={onRequestClose} label="cancel" icon ={<NavigationCheck/>} />
        ];  

        return (
            <Dialog open={open} model={true} title={dialogCaption} actions={actions} >
                <div>
                    <AutoComplete
                    hintText="Search Category"
                    floatingLabelText="Search Category"
                    searchText={categorySearchText}
                    onUpdateInput={this.queryDataForAutoComplete.bind(this)}
                    onNewRequest={(item)=>{
                        let {id,Name} = item? item:{};
                        this.props.edit({ParentCategoryId:id,category:item,categorySearchText:Name});                                
                        }
                    }	
                    errorText={errors.ParentCategoryId}				        
                    dataSource={categorySearchResult}
                    dataSourceConfig={dataSourceConfig}
                    filter={AutoComplete.noFilter}
                    openOnFocus={true}
                    loading={searchingCategoryByKeyWord}
                    id="relatedcategorySearchBox"
                    name="relatedcategorySearchBox"
                    targetOrigin={{vertical:'top',horizontal:'left'}}
                    anchorOrigin={{vertical:'bottom',horizontal:'left'}}
                    popoverProps={{style:{height:'300px',width:'300px'}}}
                    menuStyle={{width:'100%'}}
                    style={{width:'40%'}}
                    />
                    <br/>
                    <TextField style={{width:'300px',textAlign:'left'}}  hintText="Category Name"  id="Address" floatingLabelText="Category Name" value={Name} onChange={(e)=>{this.props.edit({Name:e.target.value});}}/><br/>
                </div>
            </Dialog>
        );
    }
}

const TheComponent = compose(
    connect(
        state=>({categoryEdit:state.Category.edit}),
        dispatch=>({
            edit:(edit)=>{
                dispatch({type:'CATEGORY_EDIT',edit});
            }
        })
    ),
    searchCategoryByKeyWordQuery,
    saveProductCategoryQuery
)(CategoryDialog)

    export default (Props)=>{
    return <TheComponent {...Props} limit={10} />;
}