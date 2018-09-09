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
import {deleteUserAccountMutation} from "../../apollo/UserAccount";

  class UserGrid extends React.Component{
      constructor(){
          super(...arguments);
          this.state = {
            loading:false,
            loadingMessage:''
          };
      }

      render(){
          let {UserAccounts,router} = this.props;

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
                            <TableHeaderColumn tooltip="UserName">UserName</TableHeaderColumn>
                            <TableHeaderColumn tooltip="FullName">FullName</TableHeaderColumn>
                            <TableHeaderColumn tooltip="PhoneNo">PhoneNo</TableHeaderColumn>
                            <TableHeaderColumn tooltip="AccontType">AccountType</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={true}
                    >
                        {UserAccounts ? UserAccounts.map( (p, index) => (
                        <TableRow key={index} style={{height:'50px'}} onRowClick={()=>{router.push(`/UserDetail/${p.id}`)}}>
                            <TableRowColumn>{p.UserName}</TableRowColumn>
                            <TableRowColumn>{p.FullName}</TableRowColumn>
                            <TableRowColumn>{p.PhoneNo}</TableRowColumn>
                            <TableRowColumn>{p.AccountType}</TableRowColumn>
                            <TableRowColumn><div className="row"><IconButton onClick={()=>{router.push(`/authorize/UserDetail/${p.id}`)}}><ImageEdit style={{color:'#fff'}} /></IconButton><IconButton onClick={()=>{this.props.deleteUserAccount({variables:{id:p.id}});}}><DeleteForever style={{color:'#fff'}} /></IconButton></div></TableRowColumn>                            
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
    deleteUserAccountMutation
)(UserGrid);