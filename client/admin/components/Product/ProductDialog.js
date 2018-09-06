import React from 'react';
import compose from 'react-apollo';
import connect from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class ProductDialog extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {

        };
    }

    render(){
        let {open} = this.props;

        return(
            <Dialog open={open} title={title} >
                <div>
                    <TextField id="Name" hintText="Name" floatingLabelText="Name" value={Name} style={{width:'300px',textAlign:'left'}}
                        onChange={(e)=>{edit({Name:e.target.value})}} />       
                </div>
            </Dialog>
        );
    }
}

export default compose(
    connect(
        state=>({productEdit:state.Product.edit}),
        dispatch=>({
            edit:(edit)=>{
                dispatch({type:'PRODUCT_EDIT'},action);
            }
        })
    )
)(ProductDialog);