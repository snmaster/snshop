import update from "react-addons-update";


const Category = (state={edit:{errors:{},Name:'',ParentCategoryId:null,Image:''}},action) =>{
    switch(action.type){
		case 'CATEGORY_EDIT':
            return update(state,{
                edit:{
					$set:Object.assign({},state.edit,action.edit)
				}
            });
			break;
		default:
			return state;
	}
};

export default Category;