import React from 'react';
import {Card} from 'material-ui/Card';
import {withRouter} from 'react-router';
import IconButton from 'material-ui/IconButton';
import AddItem from 'material-ui/svg-icons/content/add-circle';
import RemoveItem from 'material-ui/svg-icons/content/remove-circle';
import Accounting from 'accounting';
import {connect} from 'react-redux';


class OrderDetailItem extends React.Component{
	render(){
        let {item} = this.props;
		let {Product,Price,id,UOM,Qty} = item;
		let {Name,Alias,Thumb} = Product ? Product : {};
		
		return (
				<div className="row align-items-center" style={{marginTop:'10px',borderBottom:'1px solid'}}>
					<div className="col-sm-5 col-md-6 col-xs-5">						
						<div className="row align-items-center" style={{marginLeft:'20px'}}>
							<div className="col-xs-6">
								<img className="img-responsive" style={{width:'100px',height:'100px'}} src={Thumb} />
							</div>
							<div className="col-xs-6">
								<a href="#" onClick={(e)=>{e.preventDefault();router.push(`/detail/${id}`);}} style={{textDecoration:"none",padding:"10px"}}>
									{Name}
								</a>	
							</div>
						</div>
					</div>
					<div className="col-sm-2 col-md-2 d-none d-sm-block " style={{textAlign:'right'}}>{Accounting.formatMoney(Price)}</div>
					<div className="col-sm-3 col-md-2 d-none d-sm-block align-self-center">
                        {Qty} 						
					</div>                                
					<div className="col-sm-2 col-md-2 d-none d-sm-block">{Accounting.formatMoney(Price*Qty)}</div>
					<div className="col-xs-7 d-block d-sm-none">
						<div className="row align-items-center">
							<div className="col-xs-4">
								Unit Price
							</div>
							<div className="col-xs-7" style={{textAlign:'right'}}>{Accounting.formatMoney(Price)}</div>
						</div>
						<div className="row align-items-center">
							<div className="col-xs-4">
								Qty
							</div>
							<div className="col-xs-1" style={{textAlign:'center'}}>
								{Qty} 
							</div>		
						</div>	
						<div className="row align-items-center">
							<div className="col-xs-5">
								SubTotal
							</div>
							<div className="col-xs-7" style={{textAlign:'right'}}>{Accounting.formatMoney(Price*Qty)}</div>
						</div>					
					</div>
				</div>
			);
	}
}

export default OrderDetailItem;