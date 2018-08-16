import  React from 'react';
import {Card,CardHeader} from 'material-ui/Card';
import {compose} from 'react-apollo' ;
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
class CategoryCard extends React.Component {

  render() {
   let {ProductCategory,router} = this.props;
   let {id,Name,Thumb,SubCategories} = ProductCategory ? ProductCategory : {};

   return (
     <div style={{width:'150px',textAlign:'center'}}>
        <a className="CatMenu"
          style={{
            color:'#000',
            cursor:'pointer',
            marginTop:'8px',
            marginLeft:'10px',
            padding:'5px',
            textAlign:'center',
            alignSelf:'center',
            fontSize:'12px',
            cursor:'pointer'
          }}
          onClick={()=>{router.push(`/Product/${id}`)}}
        >{Name}</a>
        <div className="row">
        {
          SubCategories ? SubCategories.map((i)=>(<a key={i.id} className="catMenu" style={{width:'150px',textAlign:'center',fontSize:'12px',cursor:'pointer'}} onClick={()=>{router.push(`/product/${i.id}`)}}>{i.Name}</a>)) : null
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
