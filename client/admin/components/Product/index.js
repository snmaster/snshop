import React from "react";
import {compose} from "react-apollo";
import {connect} from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import {white} from "material-ui/styles/colors";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NewFolder from 'material-ui/svg-icons/file/create-new-folder';
import IconButton from "material-ui/IconButton";
import ContentAdd from 'material-ui/svg-icons/content/add'
import withRouter from "react-router";
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import productQuery from '../../apollo/Product';
import ProductGrid from "./ProductGrid";

const AppBar = ({muiTheme,onCreateNew,toggleDrawer}) =>{
    return (
        <Toolbar style={{height:'64px',backgroundColor:muiTheme.palette.primary1Color}}> 
            <ToolbarGroup firstChild={true}>
                <IconButton touch={true} onClick={toggleDrawer} >
                    <NavigationMenu color={white}/>
                </IconButton> 
                <ToolbarTitle style={{color:'#fff'}} text="Product"/>               
            </ToolbarGroup>
            <ToolbarGroup lastChild={true}>
                <IconButton touch={true} onClick={onCreateNew} >
                    <ContentAdd color={white}/>
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

class ProductBrowser extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {

        };
    }

    render(){
        let {Product} = this.props ? this.props : [];

        return(
            <div className="fullheight layout">
                <ThemeableAppBar />
                <div className="fullheight scrollable">
                    <ProductGrid Product={Product} />
                </div>
            </div>
        );
    }
}

const TheComponent = compose(
    productQuery,
    connect(
        state=>({}),
        dispatch=>({

        })
    )
)(ProductBrowser);

export default ({params})=>{
    let {id} = params ? params : {};
    return (<TheComponent productCategoryId={id} page={1} pageSize={10}/>)
}
