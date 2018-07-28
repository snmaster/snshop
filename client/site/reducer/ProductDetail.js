import update from 'react-addons-update';
import {setCookie,getCookie} from '../../cookieManager';
const initialData = {
	cart:{
		items:[]
	}
}

const cartOperation=(action)=>{
	let jItems = getCookie('cart_items');
	let items = jItems? JSON.parse(jItems):[];
	let newState = items;
	switch(action.type){
		case 'PRODUCT_CART_ADD_ITEM':
			let  index = null;
			action.item.Qty = Math.max(1,action.item.Qty);
			// items.every((g,i)=>{
			// 	if(g.id== action.item.id){
			// 		action.item.Qty = g.Qty+action.item.Qty;
			// 		index = i;
			// 		return false;
			// 	}else
			// 		return true;
			// });

			// return index != null?
			// newState = update(items,{
			// 	[action.index]:{
			// 		$set:newItem
			// 	}
			// }) :
			// newState =  update(items,{
			// 	$unshift:[action.item]
			// });
			newState =  update(items,{
				$unshift:[action.item]
			});
			
			break;
		case 'PRODUCT_CART_REMOVE_ITEM':
			newState =  update(items,{
				$splice:[[action.index,1]]
			});
			break;
		case 'PRODUCT_CART_UPDATE_ITEM':
			let newItem = Object.assign({},items[action.index],action.item);
			if(!newItem.Qty)
				newItem.Qty = 1;
			newItem.Qty = Math.max(1,newItem.Qty);
			newState = update(items,{
				[action.index]:{
					$set:newItem
				}
			});
			break;
	case 'PRODUCT_CART_ITEMS_RESET':
			newState=[];
			break;
	}
	setCookie("cart_items", JSON.stringify(newState),"/");
	return newState;
};

const ProductDetail = (state = initialData,action)=>{
	let newState = null;
	switch(action.type){
		case 'PRODUCT_CART_ADD_ITEM':
		case 'PRODUCT_CART_REMOVE_ITEM':			
		case 'PRODUCT_CART_UPDATE_ITEM':
		case 'PRODUCT_CART_ITEMS_RELOAD':
		case 'PRODUCT_CART_ITEMS_RESET':
		 	return update(state,{
		 		cart:{
		 			items:{
		 				$set:cartOperation(action)
		 			}
		 		}
		 	});
			break;
		default:
			return state;
	}
}
export {initialData};
export default ProductDetail;