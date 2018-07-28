import {default as ReactDropzone} from 'react-dropzone';
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress'; 

class Dropzone extends React.Component{
	
	render(){
		let {dropZoneProp,children,uploading} = this.props;
		return (
			<div
				style={{position:'relative'}}
			>
				<ReactDropzone
					{...dropZoneProp}
				>
					{children}
				</ReactDropzone>
				{uploading? <CircularProgress style={{position:'absolute',top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}/> : null}
			</div>
			);
	}
}

export default Dropzone;