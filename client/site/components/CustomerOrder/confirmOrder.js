import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AppBar from '../AppBar';
import Accounting from 'accounting';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { customerOrderById, customerOrderByIdQuery } from '../../apollo/CustomerOrder';


class ConfirmOrderPage extends React.Component{

    render(){
        let {CustomerOrderEdit,router} = this.props;
        let {OrderNo} = CustomerOrderEdit ? CustomerOrderEdit : {};

        return (
            <div className="layout fullheight">
                <AppBar title="Product Browser"/>                
                <div className="row justify-content-center" style={OrderNo ? {display:'block'}:{display:'none'}}>                    
                    <div className="col-md-6 col-md-offset-3" style={{textAlign:'center'}}>
                        <div style={{width:'100%',height:'50px',textAlign:'center',marginTop:'50px'}}>
                            <h3>Order Confirmation</h3>
                        </div>
                        <p>Thank you for your order. You will receive phone call shortly.</p>
                        <div style={{border:'1px solid #CCC',padding:'10px',marginBottom:'10px',borderRadius:'5px'}}>
                            <p style={{fontSize:'14px'}}><strong>Your order number is : {OrderNo}</strong></p>
                        </div>
                        <p>
                        If you have any questions about your order, please open a support ticket from your client area and quote your order number.
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center" style={{margin:'10px',height:'50px'}}>
                    <div className="col-xs-3">
                        <button type="button" style={{background:'darkblue',color:'white'}} onClick={()=>{router.push(`/customer/order`);}}>Go To Order List..</button>    
                    </div>
                    <div className="col-xs-3">
                        <button type="button" style={{background:'darkblue',color:'white'}} onClick={()=>{router.push(`/`);}}>Continue Shopping!!</button>    
                    </div>
                </div>
                {/* <div className="fullheight"
                    style={{flexWrap:'nowrap'}}>
                    <div className="row">
                        <div className="col-xs-2">FullName</div>
                        <div className="col-xs-6">{FullName}</div>
                    </div>
                    <div className="row">
                        <div className="col-xs-2">PhoneNo</div>
                        <div className="col-xs-6">{PhoneNo}</div>
                    </div>       
                    <div className="row">
                        <div className="col-xs-2">TotalAmount</div>
                        <div className="col-xs-6">{totalAmount}</div>
                    </div>             
                    <div className="col-xs-5">
                        
                    </div>
                    <div className="col-xs-1">
                        
                    </div>
                </div>					 */}
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect(
        state=>({CustomerOrderEdit:state.CustomerOrder}),
        dispatch=>({

        })
    )
)(ConfirmOrderPage);

// export default ({params:{id}})=>{
//     return (<TheComponent id={id} />);
// };