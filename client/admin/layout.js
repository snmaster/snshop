import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import AdminSiteSnackbar from './components/AdminSiteSnackbar';
import NavDrawer from './NavDrawer';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {getUserProfile} from './auth';

class Layout extends React.Component{
    componentDidMount(){
        let {editUserProfile} = this.props;
        let {user_id,user_name,full_name} = getUserProfile();

        editUserProfile({userId:user_id,userName:user_name,fullName:full_name});
    }
    render(){
        return (

            <div>
                {this.props.children}
                <AdminSiteSnackbar/>
                <NavDrawer />
            </div>
        );
    }
}

Layout.PropTypes = {
    children:PropTypes.element
};
export default compose(
    connect(
        state=>({}),
        dispatch=>({
            editUserProfile:(edit)=>{
                dispatch({type:'USER_PROFILE_EDIT',edit});
            }
        })
    )
)(Layout);
