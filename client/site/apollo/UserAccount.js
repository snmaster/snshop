import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {default as immutableUpdate} from 'react-addons-update';

// const fragments={
//     UserAccount:`
//   fragment UserAccountItem on UserAccount{
//     id
//     Alias
//     Name
//     Thumb
//     Price
//   }
// `
// };

const USERACCOUNT_QUERY = gql `
query UserAccount{
    UserAccounts:UserAccount{
        id
        UserName
        Password
        FullName
        PhoneNo
        facebookId
		AccountKitId
		AccountType
    }
}
`;

const userAccountQuery = graphql(
	USERACCOUNT_QUERY,{
		props:({data:{UserAccounts,loading,refetch}})=>{
			return {
				loading,
				UserAccounts
			};
		}
	}
);

const USERACCOUNT_BYID_QUERY = gql `
query UserAccountById($id:Int!){
    UserAccount:UserAccountById(id:$id){
        id
        UserName
        Password
        FullName
        PhoneNo
        facebookId
		AccountKitId
		AccountType
    }
}
`;

const userAccountByIdQuery = graphql(
	USERACCOUNT_BYID_QUERY,{
		options:({id})=>({
				variables:{id},
				skip:!id
		}),
		props:({data:{UserAccount,loading,refetch,fetchMore}})=>{
			return{
				loading,
				UserAccount
			};
		}
	}
);

export default userAccountQuery;
export  {userAccountByIdQuery};