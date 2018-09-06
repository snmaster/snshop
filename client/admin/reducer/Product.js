import update from 'react-addons-update';

const initialData = {
    id:null,
    Name:'',
    Alias:'',
    Description:'',
    ImagePath:'',
    ImageUrl:'',
    ThumbUrl:'',
    ProductGroupId:null,
    ProductCategoryId:null,
    ProductBrandId:null,
    UOMId:null,
    SupplierId:null,
    Price:0,
    OrderedQty:0,
    ReservedQty:0,
    MaxOrderQty:0,
    ActualBalance:0,
    errors:{}    
}


const Product = (state={edit:{initialData}},action)=>{
    switch(action.type){
        case 'PRODUCT_EDIT':
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
export default Product;