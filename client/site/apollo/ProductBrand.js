import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {default as immutableUpdate} from 'react-addons-update';

const PRODUCT_BRAND_QUERY = gql `
    query productBrandQuery{
        ProductBrand{
            id
            Name
            Thumb
        }
    }
`;

const productBrandQuery = graphql(PRODUCT_BRAND_QUERY,{
    props({ownProps,data:{loading,ProductBrand,refetch}}){
        return {
            loading,
            ProductBrand,
            refetch
        };
    }
});

export default productBrandQuery;