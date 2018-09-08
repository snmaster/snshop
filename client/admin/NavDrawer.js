import React from 'react';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
import ActionLock from 'material-ui/svg-icons/action/lock';
import {logout} from '../auth';

class NavDrawer extends React.Component{

    render(){
        let {open,onDrawerChange,router,userName} = this.props;

        return(
            <Drawer
                docked={false}
                width={300}
                open={open}
                onRequestChange={onDrawerChange}>
                <div className="layout">
                    <Menu>
                        <MenuItem primaryText="Product" onClick={()=>{router.push('/authorize/Product');onDrawerChange(false);}} />
                        <MenuItem primaryText="Category" onClick={()=>{router.push('/authorize/category');onDrawerChange(false);}} />
                        {userName? <MenuItem primaryText="Log out" onClick={()=>{logout();onDrawerChange(false);router.push('/authorize/Login');resetUserProfile();}} leftIcon={<ActionLock/>}/>: <MenuItem primaryText="Log in" onClick={()=>{router.push('/authorize/Login');onDrawerChange(false);}} leftIcon={<CommunicationVpnKey/>}/>}
                    </Menu>
                </div>
            </Drawer>
        );

    }
}

export default compose(
    connect(
        state=>({open:state.AdminSite.isNavDrawerOpen,userName:state.UserProfile.userName}),
        dispatch=>({
            onDrawerChange:(open)=>{
                if(open)
                    dispatch({type:'ADMIN_SITE_NAV_DRAWER_OPEN'});
                else
                    dispatch({type:'ADMIN_SITE_NAV_DRAWER_CLOSE'});
            },
        })
    ),
    withRouter
)(NavDrawer);