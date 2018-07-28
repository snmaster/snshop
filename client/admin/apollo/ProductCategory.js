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

const SEARCH_CATEGORY_BY_KEYWORD_QUERY = gql`
query searchCategoryByKeyWord($keyWord:String,$limit:Int!){
    searchResult:searchCategoryByKeyWord(keyWord:$keyWord,limit:$limit){
        id
        Name
    }
}
`;

const searchCategoryByKeyWordQuery = graphql(SEARCH_CATEGORY_BY_KEYWORD_QUERY,{
    props({ownProps,data:{refetch,loading,searchResult}}){
        return {
            searchCategoryByKeyWord:(keyWord,limit)=>{
                return refetch({keyWord,limit});
            },
            searchingCategoryByKeyWord:loading,
            categorySearchResult:searchResult
        };
    }
});

const SAVE_PRODUCTCATEGORY_QUERY = gql `
    mutation saveProductCategory($category:InputProductCategory){
        saveProductCategory(category:$category){
            instance{
                id
                Name
                ParentCategoryId
                Image
            }
        }
    }
`;

const saveProductCategoryQuery = graphql(SAVE_PRODUCTCATEGORY_QUERY,{
    props:({ownProps,mutate})=>{
        return {
            saveProductCategory:(category)=>{
                return mutate({
                    variables:{category}
                });
            }
        }
    }
})

export {searchCategoryByKeyWordQuery, saveProductCategoryQuery};

export default query;