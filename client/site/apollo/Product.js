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
query Product($productCategoryId:Int,$brandId:Int,$minAmount:Float,$maxAmount:Float,$sortOrder:String,$page:Int,$pageSize:Int,$search:String){
    Products:Product(productCategoryId:$productCategoryId,brandId:$brandId,minAmount:$minAmount,maxAmount:$maxAmount,sortOrder:$sortOrder,page:$page,pageSize:$pageSize,search:$search){
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
    options({productCategoryId,brandId,minAmount,maxAmount,sortOrder,page,pageSize,search}){
        return {
            variables:{
                productCategoryId,
                brandId,
                minAmount,
                maxAmount,
                sortOrder,
                page,
                pageSize:pageSize ? pageSize: 10,
                search
            }
        }   
    },
    props({ownProps:{productCategoryId,brandId,minAmount,maxAmount,sortOrder,search},data:{loading,Products,fetchMore,refetch}}){
        let {page,pageSize,hasMore,Product} = Products ? Products : {};
        return {
            productCategoryId,
            brandId,
            minAmount,
            maxAmount,
            sortOrder,
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
                        minAmount,
                        maxAmount,
                        sortOrder,
                        brandId,
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
query Product($productCategoryId:Int,$brandId:Int,$minAmount:Float,$maxAmount:Float,$sortOrder:String,$page:Int,$pageSize:Int,$search:String){
    SearchProducts:Product(productCategoryId:$productCategoryId,brandId:$brandId,minAmount:$minAmount,maxAmount:$maxAmount,sortOrder:$sortOrder,page:$page,pageSize:$pageSize,search:$search){
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
    options({productCategoryId,brandId,minAmount,maxAmount,sortOrder,page,pageSize,search}){
        return {
            variables:{
                productCategoryId,
                brandId,
                minAmount:minAmount ? minAmount: 0,
                maxAmount:maxAmount ? maxAmount: 1000000,
                sortOrder,
                page,
                pageSize:pageSize ? pageSize: 10,
                search
            }
        }
    },
    props({ownProps:{productCategoryId,brandId,minAmount,maxAmount,sortOrder,search},data:{loading,Products,fetchMore,refetch}}){
        let {page,pageSize,hasMore,Product} = SearchProducts ? SearchProducts : {};
        return {
            productCategoryId,
            brandId,
            minAmount,
            maxAmount,
            sortOrder,
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
                        minAmount,
                        maxAmount,
                        sortOrder,
                        brandId,
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
        ProductCategory{
            id
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