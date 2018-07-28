import update from 'react-addons-update';

const initialData = {
	edit:{
		shippingAddress:''
	}	
}

const Shipping = (state=initialData,action)=>{
	switch(action.type){
		case 'SHIPPING_EDIT':
            return update(state,{
                edit:{
					$set:action.edit
				}
            });
			break;
		default:
			return state;
	}
}

export {initialData};

export default Shipping;