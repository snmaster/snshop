import React from "react";
import {compose} from "react-apollo";
import {connect} from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import TextField from "material-ui/TextField";
import { withRouter } from 'react-router';
import {login,saveUserProfile} from '../../auth';

class LoginDialog extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {
            loading:false,
            userName:'',
            password:'',
            errorText:''
        };
    }

    handleLogin(){
        let {userName,password} = this.state;
        login({UserName:userName,Password:password,Remember:false}).then((result)=>{
            if(result && result.success)
                saveUserProfile(result);
        })

    }

    render(){
        let {open,closeLoginDialog} = this.props;
        let {loading,userName,password,errorText} = this.state;

        let actions = [
            <div className="row" style={{padding:'10px',display:'inline-block',float:'left'}}>
                {loading ? <CircularProgress size={36} style={{verticalAlign:'middle'}}/> : null} {loading ? <div style={{display:'inline-block'}}>{loadingMessage}</div> : null} <div style={{color:'red'}}>{loading? '': errorText}</div>
            </div>,
            <FlatButton onClick={this.handleLogin.bind(this)} label="Save" icon={<NavigationCheck/>} />,
            <FlatButton onClick={closeLoginDialog} label="cancel" icon ={<NavigationCheck/>} />
        ];  

        return(
            <Dialog open={open} model={true} title="Login..." actions={actions} >
                <TextField style={{width:'200px',textAlign:'middle'}}  hintText="UserName"  id="UserName" style={{borderRadius:10,border:'1px solid'}} value={userName} onChange={(e)=>{this.setState({userName:e.target.value});}}/><br/>
                <TextField style={{width:'200px',textAlign:'middle'}}  hintText="Password"  id="Password" style={{borderRadius:10,border:'1px solid'}} value={password} type="password" onChange={(e)=>{this.setState({password:e.target.value});}}/><br/>
            </Dialog>
        );
    }
}

export default compose(
    withRouter,
    connect(
        state=>({open:state.Site.isLoginDialogOpen}),
        dispatch=>({
            closeLoginDialog:()=>{
                dispatch({type:'LOGIN_DIALOG_CLOSE'});
            }
        })
    )
)(LoginDialog);