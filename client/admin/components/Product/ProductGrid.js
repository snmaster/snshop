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

  class ProductGrid extends React.Component{
      constructor(){
          super(...arguments);
          this.state = {
            loading:false,
            loadingMessage:''
          };
      }

      render(){
          let {Product,router} = this.props;

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
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Alias">Alias</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Price">Price</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Actions"></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={true}
                    >
                        {Product ? Product.map( (p, index) => (
                        <TableRow key={index} style={{height:'50px'}} onRowClick={()=>{router.push(`/ProductDetail/${p.id}`)}}>
                            <TableRowColumn>{p.id}</TableRowColumn>
                            <TableRowColumn>{p.Name}</TableRowColumn>
                            <TableRowColumn>{p.Alias}</TableRowColumn>
                            <TableRowColumn>{Accounting.formatMoney(p.Price)}</TableRowColumn>
                            <TableRowColumn><div className="row"><IconButton onClick={()=>{router.push(`/authorize/ProductDetail/${p.id}`)}}><ImageEdit style={{color:'#fff'}} /></IconButton><IconButton><DeleteForever style={{color:'#fff'}} /></IconButton></div></TableRowColumn>                            
                        </TableRow>
                        )): null}
                    </TableBody>

                </Table>
            </div>
          );
      }
  }

export default compose(
    withRouter    
)(ProductGrid);