import React from 'react';
import { customerOrderByIdQuery } from "../../apollo/CustomerOrder";
import {Card,CardText,CardHeader} from "material-ui/Card";
import {compose} from "react-apollo";
import {connect} from "react-redux";
import AppBar from '../AppBar';
import Accounting from 'accounting';
import OrderDetailItem from './OrderDetailItem';

class OrderDetail extends React.Component{

    render(){
        let {CustomerOrder} = this.props;
        let {OrderNo,OrderDate,TotalAmount,ShippingCost,TotalQty,OrderStatus,detail} = CustomerOrder ? CustomerOrder : {};

        return(
            <div className="fullheight layout">
                <AppBar />
                <div className="fullheight scrollable">
                <Card>
                    <CardText>
                        <div>
                            <div className="row">
                                <span>OrderNo </span>: {OrderNo} 
                            </div>
                            <div className="row">
                                <span>OrderDate </span>: {OrderDate} 
                            </div>
                            <div className="row">
                                <span>ShippingCost </span>: {ShippingCost} 
                            </div>
                            <div className="row">
                                <span>TotalAmount </span>: {TotalAmount} 
                            </div>
                            <div className="row">
                                <span>TotalQty </span>: {TotalQty} 
                            </div>
                            <div className="row">
                                <span>OrderStatus </span>: {OrderStatus} 
                            </div>
                        </div>
                    </CardText>
                    <div className="col-md-10 col-md-offset-3">
                        <div >
                            <div className="row" style={{height:'50px',border:'1px solid'}}>
                                <div className="col-xs-6 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Product Name</div>
                                <div className="col-xs-2 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Unit Price</div>
                                <div className="col-xs-2 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Qty</div>                                
                                <div className="col-xs-2 d-none d-sm-block" style={{marginTop:'20px',textAlign:'center',fontSize:'14px',fontStyle:'bold'}}>Subtotal</div>
                            </div>
                            {detail? detail.length > 0 ? detail.map((i,index)=>(<OrderDetailItem key ={i.id} index={index} item={i}/>)):<div><h3>Your Cart is empty.</h3></div> : null}
                        </div>
                        <div className="summary-row row">
                            <div className="col-md-10 col-sm-8 col-xs-6" style={{float:'right'}}>
                                Total
                            </div>
                            <div className="col-sm-2">
                                {Accounting.formatMoney(TotalAmount)}
                            </div>
                        </div>								
                    </div>                    
                </Card>
                </div>
            </div>
        );
    }
}

const TheComponent = compose(
    customerOrderByIdQuery,
    connect(
        state=>({customerId:state.UserProfile.userId}),
        dispatch=>({

        })
    )
)(OrderDetail);

export default ({params})=>{
    let {id} = params ? params : {};
    return (<TheComponent id={id}/>)
}