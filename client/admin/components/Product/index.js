import React from "react";
import {compose} from "react-apollo";
import {connect} from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import {white} from "material-ui/styles/colors";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NewFolder from 'material-ui/svg-icons/file/create-new-folder';
import IconButton from "material-ui/IconButton";
import withRouter from "react-router";
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

const AppBar = ({muiTheme,onCreateNew,toggleDrawer}) =>{
    return (
        <Toolbar style={{height:'64px',backgroundColor:muiTheme.palette.primary1Color}}> 
            <ToolbarGroup firstChild={true}>
                <IconButton touch={true} onClick={toggleDrawer} >
                    <NavigationMenu color={white}/>
                </IconButton> 
                <ToolbarTitle style={{color:'#fff'}} text="Product"/>               
            </ToolbarGroup>
        </Toolbar>
    );
}

const ThemeableAppBar = compose(
    connect(
        state=>({}),
        dispatch=>({
            toggleDrawer:()=>{
                dispatch({type:'ADMIN_SITE_NAV_DRAWER_TOGGLE'});
            }
        })
    ),
    muiThemeable()
)(AppBar);

class ProductBrowser extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {

        };
    }

    render(){

        return(
            <div className="fullheight layout">
                <ThemeableAppBar />
                <div className="fullheight">
                    
                </div>
            </div>
        );
    }
}

export default ProductBrowser;
