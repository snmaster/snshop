import Dialog from 'material-ui/Dialog';
import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
class ConfirmDialog extends React.Component{
	constructor(){
		super(...arguments);
		this.state={
			text:''
		};
	}
	handleOK(){
		let {onConfirmed} = this.props;
		let {text} = this.state;
		if(text === 'CONFIRM')
			onConfirmed();
	}
	render(){
		let {title,message,open,onCancelled} = this.props;
		let {text} = this.state;
		return (
			<Dialog
				open={open}
				onRequestClose={onCancelled}
				title={title}
				actions={[
						<FlatButton label="OK" onClick={this.handleOK.bind(this)}/>,
						<FlatButton label="Cancel" onClick={onCancelled}/>
					]}
			>
				{message}
				<br/>
				<TextField value={text} onChange={(e)=>{this.setState({text:e.target.value});}} id="confirmDialogTextField" name="confirmDialogTextField" hintText="Enter 'CONFIRM' and click OK" />
			</Dialog>
			);
	}
}

export default ConfirmDialog;