import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {default as immutableUpdate} from 'react-addons-update';

// const fragments={
//     Product:`
//   fragment ProductItem on Product{
//     id
//     Alias
//     Name
//     Thumb
//     Price
//   }
// `
// };

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
                Price
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

const SEARCH_PRODUCT_QUERY = gql `
query Product($productCategoryId:Int,$page:Int,$pageSize:Int,$search:String){
    SearchProducts:Product(productCategoryId:$productCategoryId,page:$page,pageSize:$pageSize,search:$search){
        page
        pageSize
        totalRows
        hasMore
        Product{
                id
                Alias
                Name
                Thumb
                Price
                UOM{
                    Name
                }
        }
    }
}
`;

const searchProductQuery = graphql(SEARCH_PRODUCT_QUERY,{
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
        let {page,pageSize,hasMore,Product} = SearchProducts ? SearchProducts : {};
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
                            SearchProducts:Object.assign({},previousResult.SearchProducts,fetchMoreResult.SearchProducts,{
                                Product:[...previousResult.SearchProducts.Product, ...fetchMoreResult.SearchProducts.Product]
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

const PRODUCT_BYID_QUERY = gql `
query ProductById($id:Int!){
    Product:ProductById(id:$id){
        id
        Name
        Alias
        Description
        UOM{
            Name
        }
        Price
        Image
        Thumb
    }
}
`;

const productByIdQuery = graphql(
	PRODUCT_BYID_QUERY,{
		options:({id})=>({
				variables:{id},
				skip:!id
		}),
		props:({data:{Product,loading,refetch,fetchMore}})=>{
			return{
				loading,
				Product
			};
		}
	}
);

const SEARCH_PRODUCT_BY_KEYWORD_QUERY = gql`
query searchProductByKeyWord($keyWord:String,$limit:Int!){
    searchResult:searchProductByKeyWord(keyWord:$keyWord,limit:$limit){
        id
        Alias
        Name
        Thumb
        Price
    }
}
`;

const searchProductByKeyWord = graphql(SEARCH_PRODUCT_BY_KEYWORD_QUERY,{
    props({ownProps,data:{refetch,loading,searchResult}}){
        return {
            searchProductByKeyWord:(keyWord,limit)=>{
                return refetch({keyWord,limit});
            },
            searchingProductByKeyWord:loading,
            productSearchResult:searchResult
        };
    }
});

export default productQuery;
export  {searchProductByKeyWord,productByIdQuery,searchProductQuery};