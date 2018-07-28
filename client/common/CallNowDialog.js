import React from 'react';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import Dialog from 'material-ui/Dialog';
class CallNowDialog extends React.Component{
	render(){
		let {open,PhoneNo,onClose,title} = this.props;
		return (
			<Dialog
				contentStyle={{maxWidth:'360px'}}
				title={title}
				open={open}
				actions={
					[
						<FlatButton label="Close" onClick={onClose}/>
					]
				}
				onRequestClose={onClose}
			>
				<List>
					{
						PhoneNo.map((p)=>(<a key={p}  href={`tel:${p}`} style={{textDecoration:'none'}}><ListItem primaryText={p} leftIcon={<CommunicationCall/>}/></a>))
					}
				</List>

			</Dialog>
			);
	}
}

export default CallNowDialog;