import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {default as immutableUpdate} from 'react-addons-update';

const fragments = {
    ProductCategory:gql`
    fragment ProductCategoryItem on ProductCategory{
        id
        ParentCategoryId
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
        ParentCategoryId
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

const DELETE_PRODUCTCATEGORY_MUTATION = gql`
    mutation deleteProductCategory($id:Int!){
        deleteProductCategory(id:$id){
            id
        }
    }
`;

const deleteProductCategoryMutation = graphql(DELETE_PRODUCTCATEGORY_MUTATION,{
    props:({mutate})=>{
        return {
			deleteProductCategory:(args)=>{
				args.updateQueries={
					query:(prev,{mutationResult})=>{
						let mutatedInstance = mutationResult.data.deleteProductCategory;
						if(!mutatedInstance)
                            return prev;
                            
                        let index = null;
                        prev.ProductCategory.every((g,i)=>{
                            if(g.id===mutatedInstance.id){
                                index=i;
                                return false;
                            }else
                                return true;
                        });

                        return index != null? immutableUpdate({
							ProductCategory:{
								$splice:[[index,1]]
							}
						}): prev;

					}
				};
				return mutate(args);
			}
		};
    }
})

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
            saveProductCategory:(args)=>{
                args.updateQueries={
                    query:(prev,{mutationResult})=>{
						let mutatedInstance = mutationResult.data.saveProductCategory;
						if(!mutatedInstance)
                            return prev;

                        let index = null;
                        prev.ProductCategory.every((g,i)=>{
                            if(g.id===mutatedInstance.id){
                                index=i;
                                return false;
                            }else
                                return true;
                        });
                            
                        return index !== null? immutableUpdate({
							ProductCategory:{
                                [index]:{
                                    $set:[mutatedInstance]
                                }								
							}
						}): immutableUpdate({
							ProductCategory:{
								$unshift:[mutatedInstance]
							}
						});

					}
                };

                return mutate(args);
            }
        }
    }
})

export {searchCategoryByKeyWordQuery, saveProductCategoryQuery, deleteProductCategoryMutation};

export default query;