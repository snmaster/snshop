import Snackbar from 'material-ui/Snackbar';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import React from 'react';

class AdminSiteSnackbar extends  React.Component{
	render(){
		let {isOpen,close,message} = this.props;
		return (
			<Snackbar
				open={isOpen}
				message={message}
				autoHideDuration={3000}
				onRequestClose={close}
			/>
			);
	}
}

export default compose(
	connect(
			state=>({isOpen:state.AdminSite.isSnackbarOpen,message:state.AdminSite.snackbarMessage}),
			dispatch=>({
				close:()=>{
					dispatch({type:'ADMIN_SITE_SNACKBAR_CLOSE'});
				}
			})
		)
)(AdminSiteSnackbar);
