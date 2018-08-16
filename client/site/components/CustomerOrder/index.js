import React from "react";
import {compose} from "react-apollo";
import {connect} from "react-redux";
import AppBar from "../AppBar";
import customerOrderQuery from "../../apollo/CustomerOrder";
import CustomerOrderItem from "./CustomerOrderItem";

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
                <AppBar />
                <div className="fullheight scrollable row">
                <h3>Customer Order List</h3>
                {
                    CustomerOrder ? CustomerOrder.map((c)=>{
                        return <CustomerOrderItem key={c.id} order={c}/>
                    }) : null
                }
                </div>
            </div>
        );
    }

}

const TheComponent = compose(
    connect(
        state=>({customerId:state.UserProfile.userId}),
        dispatch=>({

        })
    ),
    customerOrderQuery
)(OrderBrowser);

export default (props)=>{
    return (<TheComponent {...props} page={1} pageSize={10} /> )
}