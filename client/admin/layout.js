import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import AdminSiteSnackbar from './components/AdminSiteSnackbar';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
class Layout extends React.Component{
    render(){
        return (

            <div>
                {this.props.children}
                <AdminSiteSnackbar/>
            </div>
        );
    }
}

Layout.PropTypes = {
    children:PropTypes.element
};
export default Layout;
