import React,{PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Checkbox from 'material-ui/Checkbox';
import {adminSiteLogin,saveUserProfile} from '../../auth';

class Login extends React.Component{
	handleLogin(){
		let {Login,showSnackbar} = this.props;
		adminSiteLogin(Login.edit).then(result=>{
			if(result && result.success){
				saveUserProfile(result.sessionData);
				window.location.href='/admin/category';
			}else if(result)
				showSnackbar(`Could not login.${result.message}`);
			else
				showSnackbar(`Could not login`);
		})
		.catch(error=>{
			showSnackbar("Could not login " + error);
		});
	}
	render(){
		let {Login,makeEdit} = this.props;
		let {edit} = Login;
		let {UserName,Password,Remember} =edit;
		return (
			<div className="row fullheight" style={{justifyContent:'center',alignItems:'center'}}>
				<div style={{display:'inline-block'}}>
					<TextField name="UserName" id="UserName" hintText="User Name" ref="UserName" floatingLabelText="User Name" value={UserName} onChange={e=>{makeEdit({UserName:e.target.value});}}/>
					<br/>
					<TextField name="Password" id="Password" hintText="Password" ref="Password" floatingLabelText="Password" value={Password} onChange={e=>{makeEdit({Password:e.target.value});}} type="password" />
					<br/>
					<Checkbox label="Keep Login" id="Remember" checked={Remember} onCheck={e=>{makeEdit({Remember:e.target.checked});}}/>
					<br/>
					<RaisedButton label="Login" secondary={true} onTouchTap={this.handleLogin.bind(this)}/>
				</div>
			</div>
			);
	}
}

export default compose(
		connect(
			state=>({Login:state.Login}),
			dispatch=>({
				showSnackbar:(message)=>dispatch({type:"ADMIN_SITE_SNACKBAR_OPEN",message}),
				makeEdit:(edit)=>{dispatch({type:'LOGIN_EDIT',edit});}
			})
			)
	)(Login);