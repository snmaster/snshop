import  React from 'react';
import {Card,CardHeader} from 'material-ui/Card';
import {compose} from 'react-apollo' ;
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
class CategoryCard extends React.Component {

  render() {
   let {ProductCategory,router,onClosePopup} = this.props;
   let {id,Name,Thumb,SubCategories} = ProductCategory ? ProductCategory : {};

   return (
     <div style={{width:'200px'}}>
        <div className="subCat" onClick={()=>{router.push(`/Product/${id}`);onClosePopup();}}>{Name}</div>
        <div className="row">
        {
          SubCategories ? SubCategories.map((c,index)=>(<div key={c.id} className="subCatItem" onClick={()=>{router.push(`/product/${c.id}`);onClosePopup();}}>> {c.Name}</div>)) : null
        }
        </div>
      </div>
   );
  }

}

export default compose(
  withRouter
)
(CategoryCard);
