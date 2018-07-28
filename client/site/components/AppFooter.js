import React, {Component} from 'react';
import {Link} from 'react-router'
import {Footer} from 'react-materialize';
//import '../../resource/template.css'


class AppFooter extends Component{
  render(){
return (
<div>
{this.props.children}
  <Footer >      
        <span style={{width:'100%',height:'200px',textAlign:'center',fontSize:'14px',color:'white'}}>© 2018 - Phoewa Online Shopping. All rights reserved</span>      
  </Footer>

</div>
);
 }
}
export default AppFooter;