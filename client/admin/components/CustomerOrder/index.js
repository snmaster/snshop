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
import CustomerOrderGrid from "./CustomerOrderGrid";
import customerOrderQuery from "../../apollo/CustomerOrder";
import CustomerOrderItem from "./CustomerOrderItem";

const AppBar = ({muiTheme,onCreateNew,toggleDrawer}) =>{
    return (
        <Toolbar style={{height:'64px',backgroundColor:muiTheme.palette.primary1Color}}> 
            <ToolbarGroup firstChild={true}>
                <IconButton touch={true} onClick={toggleDrawer} >
                    <NavigationMenu color={white}/>
                </IconButton> 
                <ToolbarTitle style={{color:'#fff'}} text="Customer Order"/>               
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

class OrderBrowser extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {

        };
    }

    render(){
        let {page,pageSize,CustomerOrder} = this.props;

        return(
            <div className="fullheight layout">
                <ThemeableAppBar />
                <div className="fullheight scrollable row">
                <div style={{width:'100%',textAlign:'center',marginTop:'20px'}}>
                    <h3>Customer Order List</h3>
                </div>                
                <div className="fullheight scrollable">
                    <CustomerOrderGrid CustomerOrder={CustomerOrder} />
                </div>
                {/* {
                    CustomerOrder ? CustomerOrder.map((c)=>{
                        return <CustomerOrderItem key={c.id} order={c}/>
                    }) : null
                } */}
                </div>
            </div>
        );
    }

}

const TheComponent = compose(
    connect(
        state=>({}),
        dispatch=>({

        })
    ),
    customerOrderQuery
)(OrderBrowser);

export default (props)=>{
    return (<TheComponent {...props} page={1} pageSize={10} /> )
}