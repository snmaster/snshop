import React from 'react';
import CircularProgress from 'material-ui/CircularProgress'

class LoadingIndicator extends React.Component{
	render(){
		let {loading,loadingMessage,errorText} = this.props;
		return loading || errorText? (<div className="row" style={{height:'64px', paddingTop:'12px',paddingLeft:'12px'}}>
                        {loading ? <CircularProgress/> : null} {loading ? <div style={{padding:'10px'}}>{loadingMessage}</div> : null} <div style={{padding:'10px',color:'red'}}>{loading? '': errorText}</div>
                </div>):null;
	}
}

export default LoadingIndicator;