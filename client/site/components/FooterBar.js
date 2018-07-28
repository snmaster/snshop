import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import {Toolbar,ToolbarGroup,ToolbarTitle} from 'material-ui/Toolbar';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ActionSearch from 'material-ui/svg-icons/action/search';
import React from 'react';
import { white } from 'material-ui/styles/colors';

class FooterBar extends React.Component{
	constructor(){
		super(...arguments);
	}
	render(){
		

	return (		
	    <footer className="row" id="footer">
            <div className="row-padding" style={{width:'100%',height:'200px',background:'purple',color:white}}>
                <div className="col-sm-4 col-xs-4">
                    
                </div>
                <div className="col-sm-4 col-xs-4">
                    <h4>About</h4>
                </div>
                <div className="col-sm-4 col-xs-4">
                    <h4>Phoewa Online Shopping</h4>
                    <p><i className="fa fa-fw fa-map-marker"></i> SourceNet Solution</p>
                    <p><i className="fa fa-fw fa-phone"></i> +959797525977</p>
                    <p><i className="fa fa-fw fa-envelope"></i> sourcenet@gmail.com</p>
                </div>
            </div>
        </footer>
	);
	}
}

export default FooterBar;
	