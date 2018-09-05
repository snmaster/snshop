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

  class ProductGrid extends React.Component{
      constructor(){
          super(...arguments);
          this.state = {
            loading:false,
            loadingMessage:''
          };
      }

      render(){
          let {Product} = this.props;

          return(
            <div className="fullheight scrollable">
                <Table 
                    height={80} fixedHeader={true} fixedFooter={true} selectable={true} multiSelectable={false}>
                    <TableHeader
                        displaySelectAll={true}
                        adjustForCheckbox={true}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Alias">Alias</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Price">Price</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={true}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={true}
                    >
                        {Product ? Product.map( (p, index) => (
                        <TableRow key={index}>
                            <TableRowColumn>{index}</TableRowColumn>
                            <TableRowColumn>{p.Name}</TableRowColumn>
                            <TableRowColumn>{p.Alias}</TableRowColumn>
                            <TableRowColumn>{Accounting.formatMoney(p.Price)}</TableRowColumn>
                        </TableRow>
                        )): null}
                    </TableBody>

                </Table>
            </div>
          );
      }
  }

export default ProductGrid;