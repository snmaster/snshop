import React from "react";
import {compose} from "react-apollo";
import {connect} from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import {white} from "material-ui/styles/colors";
import CategoryCard from "./CategoryCard";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NewFolder from 'material-ui/svg-icons/file/create-new-folder';
import IconButton from "material-ui/IconButton";
import withRouter from "react-router";
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import query from "../../apollo/ProductCategory";
import CategoryDialog from "./CategoryDialog";

const AppBar = ({muiTheme,onCreateNew,toggleDrawer,onCreateCategory}) =>{
    return (
        <Toolbar style={{height:'64px',backgroundColor:muiTheme.palette.primary1Color}}>
            <ToolbarGroup firstChild={true}>
                <IconButton touch={true} onClick={toggleDrawer}>
                    <NavigationMenu color={white} />
                </IconButton>
            </ToolbarGroup>
            <ToolbarGroup lastChild={true}>
                <IconButton touch={true} onClick={onCreateCategory}>
                    <NewFolder color={white} />
                </IconButton>
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

class ProductCategory extends React.Component{
    constructor(){
        super(...arguments);
        this.state ={
            crateNew:false
        };
    }

    render(){

        let { ProductCategory} = this.props;

        return(
            <div className="fullheight layout">
                <ThemeableAppBar onCreateCategory={()=>{this.setState({createNew:true});}}/>
                <div className="fullheight scrollable row grid">
                {
                    ProductCategory ? ProductCategory.map(({id,Name})=>(<CategoryCard key={id} id={id} Name={Name} style={{marginTop:'20px',marginLeft:'10px',marginRight:'10px'}} />)) : ''
                }
                </div>
                <CategoryDialog open={this.state.createNew} dialogCaption="Create New Category" onRequestClose={()=>{this.setState({createNew:false});}} />
            </div>            
        );
    }
}

export default compose(
    connect(
        state=>({}),
        dispatch=>({

        })
    ),
    query
) (ProductCategory);