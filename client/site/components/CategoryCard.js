import  React from 'react';
import {Card,CardHeader} from 'material-ui/Card';
import {compose} from 'react-apollo' ;
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
class CategoryCard extends React.Component {

  render() {
   let {ProductCategory,router} = this.props;
   let {id,Name,Thumb} = ProductCategory ? ProductCategory : {};

   return (
    <a onClick={()=>{router.push(`/Product/${id}`)}} >
     <div
        className="row"
        style={{
          cursor:'pointer',margin:'5px',padding:'3px',border:'1px solid',width:'auto'
        }} 
        >
        <img src={Thumb} style={{width:"50px",height:'50px'}}/>
        <span
          style={{
            color:'#000',
            marginTop:'8px',
            marginLeft:'10px',
            padding:'5px',
            textAlign:'center',
            alignSelf:'center',
            fontSize:'12px'
          }}
        >{Name}</span>
      </div>
      </a>
   );
  }

}

export default compose(
  withRouter
)
(CategoryCard);
