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
query userAccountQuery{
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

const DELETE_USERACCOUNT_MUTATION = gql`
mutation deleteUserAccount($id:Int!){
    deleteUserAccount(id:$id){
        id
    }
}
`;

const deleteUserAccountMutation = graphql(DELETE_USERACCOUNT_MUTATION,{
props:({mutate})=>{
    return {
        deleteUserAccount:(args)=>{
            args.updateQueries={
                userAccountQuery:(prev,{mutationResult})=>{
                    let mutatedInstance = mutationResult.data.deleteUserAccount;
                    if(!mutatedInstance)
                        return prev;
                        
                    let index = null;
                    prev.UserAccounts.every((g,i)=>{
                        if(g.id===mutatedInstance.id){
                            index=i;
                            return false;
                        }else
                            return true;
                    });

                    return index != null? immutableUpdate(prev,{
                        UserAccounts:{
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


export default userAccountQuery;
export  {userAccountByIdQuery,deleteUserAccountMutation};