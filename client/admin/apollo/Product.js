import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {default as immutableUpdate} from 'react-addons-update';


const PRODUCT_QUERY = gql `
query Product($productCategoryId:Int,$page:Int,$pageSize:Int,$search:String){
    Products:Product(productCategoryId:$productCategoryId,page:$page,pageSize:$pageSize,search:$search){
        page
        pageSize
        totalRows
        hasMore
        Product{
                id
                Alias
                Name
                Thumb
                Priceindex
                UOM{
                    Name
                }
        }
    }
}
`;

const productQuery = graphql(PRODUCT_QUERY,{
    options({productCategoryId,page,pageSize,search}){
        return {
            variables:{
                productCategoryId,
                page,
                pageSize:pageSize ? pageSize: 10,
                search
            }
        }
    },
    props({ownProps:{productCategoryId,search},data:{loading,Products,fetchMore,refetch}}){
        let {page,pageSize,hasMore,Product} = Products ? Products : {};
        return {
            productCategoryId,
            loading,
            page:page? page: 1,
            pageSize,
            hasMore,
            Product,
            loadMore(page){
                return fetchMore({
                    variables:{
                        page,
                        pageSize,
                        productCategoryId,
                        search
                    },                
                    updeateQuery:(previousResult,{fetchMoreResult})=>{
                        if(!fetchMoreResult){
                            return previousResult;
                        }
                        const result =  Object.assign({},previousResult,{
                            Products:Object.assign({},previousResult.Products,fetchMoreResult.Products,{
                                Product:[...previousResult.Products.Product, ...fetchMoreResult.Products.Product]
                            })
                        });
                        return result;
                    }
                });
        },
        refetch
    }
    }
});

export default productQuery;