import React from 'react';
import {withRouter} from 'react-router';

class Home extends React.Component{
    render(){
        return (<h1>Home <button value="GO" onClick={()=>{this.props.router.push("/admin/CustomerOrderManager");}}/></h1>);
    }
}

export default withRouter(Home);

