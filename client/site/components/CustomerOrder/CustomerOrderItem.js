import React from "react";
import {compose} from "react-apollo";
import {connect} from "react-redux";
import {withRouter} from 'react-router';
import {Card,CardText,CardHeader} from "material-ui/Card";

class CustomerOrderItem extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {

        };
    }


    render(){
        let {order,router} = this.props;
        let {id,OrderDate,OrderNo,TotalAmount,TotalQty} = order ? order : {};

        return(
            <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12" >
               <Card onClick={()=>{router.push(`/customer/order/detail/${id}`);}}>
                    <CardText>
                        <div>
                            <div className="row">
                                <span>OrderNo </span>: {OrderNo} 
                            </div>
                            <div className="row">
                                <span>OrderDate </span>: {OrderDate} 
                            </div>
                            <div className="row">
                                <span>TotalAmount </span>: {TotalAmount} 
                            </div>
                            <div className="row">
                                <span>TotalQty </span>: {TotalQty} 
                            </div>
                        </div>
                    </CardText>                    
                </Card>
            </div>
        );
    }
}

export default compose(
    withRouter
)(CustomerOrderItem);