import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right';    
import {getRootCategoryQuery} from '../../apollo/ProductCategory';
import {withRouter} from 'react-router';
import {compose} from 'react-apollo';

class CategoryPath extends React.Component{

    render(){
        let {rootCategories,router} = this.props;
        return (
            <div className="layout">
                <div className="row" style={{width:'100%',height:'50px',marginLeft:'20px',marginTop:'10px'}}>
                    {
                        rootCategories ? rootCategories.map((c,i)=>(<ListItem key={i} primaryText={c.Name} style={{width:'auto'}} height={20} rightIcon={<RightArrow />} onClick={()=>{router.push(`/Product/${c.id}`);}}/>)): null
                    }
                </div>
            </div>
        );
    }
}

export default compose(
    getRootCategoryQuery,
    withRouter
)(CategoryPath);