import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import Accounting from 'accounting';
import { withRouter } from 'react-router';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { IconButton } from 'material-ui';
import {deleteCutomerOrderMutation, deleteCustomerOrderMutation} from '../../apollo/CustomerOrder';

  class CustomerOrderGrid extends React.Component{
      constructor(){
          super(...arguments);
          this.state = {
            loading:false,
            loadingMessage:''
          };
      }

      render(){
          let {CustomerOrder,router} = this.props;

          return(
            <div className="fullheight scrollable">
                <Table 
                    height="500px" fixedHeader={true} fixedFooter={true} selectable={true} multiSelectable={false}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={true}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="OrderNo">OrderNo</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Customer">Customer</TableHeaderColumn>
                            <TableHeaderColumn tooltip="TotalAmount">Total Amount</TableHeaderColumn>
                            <TableHeaderColumn tooltip="TotalQty">TotalQty</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={true}
                    >
                        {CustomerOrder ? CustomerOrder.map( (p, index) => (
                        <TableRow key={index} style={{height:'50px'}} onRowClick={()=>{router.push(`/CustomerOrderDetail/${p.id}`)}}>
                            <TableRowColumn>{p.OrderNo}</TableRowColumn>
                            <TableRowColumn>{p.OrderDate}</TableRowColumn>
                            <TableRowColumn>{p.Customer ? p.Customer.FullName ? p.Customer.FullName : p.Customer.UserName : ''}</TableRowColumn>
                            <TableRowColumn>{Accounting.formatMoney(p.TotalAmount)}</TableRowColumn>
                            <TableRowColumn>{Accounting.formatMoney(p.TotalQty)}</TableRowColumn>
                            <TableRowColumn><div className="row"><IconButton onClick={()=>{router.push(`/authorize/CustomerOrderDetail/${p.id}`)}}><ImageEdit style={{color:'#fff'}} /></IconButton><IconButton onClick={()=>{this.props.deleteCustomerOrder({variables:{id:p.id}});}}><DeleteForever style={{color:'#fff'}} /></IconButton></div></TableRowColumn>                            
                        </TableRow>
                        )): null}
                    </TableBody>

                </Table>
            </div>
          );
      }
  }

export default compose(
    withRouter,
    deleteCustomerOrderMutation
)(CustomerOrderGrid);