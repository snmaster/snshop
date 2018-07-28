import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';

class ConfirmDialog extends React.Component{

	
	render(){
		let {open,title,text,onAccepted,onRejected} = this.props;
		return (
			<Dialog
				open={open}
				title={title}
				onRequestClose={onRejected}
				actions={[
						<FlatButton primary={true} label="OK" onTouchTap={onAccepted}/>,
						<FlatButton label="Cancel" onTouchTap={onRejected}/>
					]}
			>
				{text}
			</Dialog>
			);
	}
}

export default ConfirmDialog
