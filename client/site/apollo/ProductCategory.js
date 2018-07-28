import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {default as immutableUpdate} from 'react-addons-update';


const fragments = {
    ProductCategory:gql`
    fragment ProductCategoryItem on ProductCategory{
        id
        Name
        Thumb
    }
`
};


const GROUP_QUERY = gql`
query productCategoryQuery($parentCategoryId:Int,$page:Int,$pageSize:Int){
  ProductCategory(parentCategoryId:$parentCategoryId,page:$page,pageSize:$pageSize){
    ...ProductCategoryItem
  }
}
${fragments.ProductCategory}
`;


const query = graphql(GROUP_QUERY,{
    options({parentCategoryId,page,pageSize}){
        return {
            variables:{
                parentCategoryId,
                page,
                pageSize
            }
        };
    },
    props({ownProps,data:{loading,ProductCategory,refetch}}){
        return {
            loading,
            ProductCategory,
            refetch
        };
    }
});


// const ProductCategory_QUERY = gql`
// query ProductCategoryQuery($page:Int!,$pageSize:Int!,$parentCategoryId:Int){
//     ProductCategories:ProductCategory(page:$page,pageSize:$pageSize,parentCategoryId:$parentCategoryId){
//         page
//         pageSize
//         hasMore
//         totalRows
//         ProductCategory{
//             ...ProductCategoryItem
//         }
//     }
// }
// ${fragments.ProductCategory}
// `;
// const query = graphql(ProductCategory_QUERY,{
//     options({parentCategoryId,page,pageSize}){
//         return {
//             variables:{
//                 parentCategoryId,
//                 page,
//                 pageSize: pageSize ? pageSize : 20
//             }
//         };
//     },
//     props({ownProps:{parentCategoryId,search,spec,brand},data:{loading,ProductCategorys,fetchMore,refetch}}){
//         let {page,hasMore,ProductCategory,pageSize}= ProductCategorys? ProductCategorys: {};
//         return {
//             parentCategoryId,
//             loading,
//             page:page? page: 1,
//             pageSize: pageSize ? pageSize : 20,
//             hasMore,
//             ProductCategory,
//             loadMore(page){
//                 return fetchMore({
//                     variables:{
//                         page,
//                         pageSize,
//                         parentCategoryId
//                     },
//                     updateQuery:(previousResult,{fetchMoreResult})=>{
//                         if(!fetchMoreResult){
//                             return previousResult;
//                         }
//                         const result =  Object.assign({},previousResult,{
//                             ProductCategorys:Object.assign({},previousResult.ProductCategorys,fetchMoreResult.ProductCategorys,{
//                                 ProductCategory:[...previousResult.ProductCategorys.ProductCategory, ...fetchMoreResult.ProductCategorys.ProductCategory]
//                             })
//                         });
//                         return result;
//                     }
//                 });
//             },
//             refetch
//         }
//     }
// });



export default query;