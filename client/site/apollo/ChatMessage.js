import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {default as immutableUpdate} from 'react-addons-update';

const CREATE_CHAT_MESSAGE_MUTATION = gql`
    mutation createChatMessage($chatMessage:InputChatMessage){
        createChatMessage(chatMessage:$chatMessage){
            id
            SenderId
            ReceiverId
            content
            Sender{
                id
                UserName
            }
            Receiver{
                id
                UserName
            }
            createdAt
        }
    }
`

const createChatMessageMutation = graphql(CREATE_CHAT_MESSAGE_MUTATION,{name:'createChatMessageMutation'},{
    props({ownProps,mutate}){
        return {
            createChatMessage:(variables)=>{
                return mutate({
                    variables
                });
            }
        };
    }
});

const CHAT_MESSENGE_QUERY = gql`
    query chatMessageQuery($senderId:Int,$page:Int,$pageSize:Int){
        allMessages:ChatMessage(senderId:$senderId,page:$page,pageSize:$pageSize){
            page
            pageSize
            hasMore
            totalRows
            ChatMessage{
                id
                SenderId
                ReceiverId
                Sender{
                    id
                    UserName
                }
                Receiver{
                    id
                    UserName
                }
                content
                createdAt
            }
        }

    }
`;

const CHAT_MESSAGE_SUBSCRIPTION = gql`
subscription messageAdded($senderId1:Int!,$senderId2:Int!){
    messageAdded(senderId1:$senderId1,senderId2:$senderId2){
        id
        SenderId
        ReceiverId
        content
        Sender{
          id
          UserName
        }
        Receiver{
          id
          UserName
        }
        createdAt
  } 
}
`

const chatMessageQuery = graphql(CHAT_MESSENGE_QUERY,
    {name:"allMessagesQuery",
    options({page,pageSize,senderId}){
        return {
            variables:{
                page: page? page: 1,
                pageSize: pageSize ? pageSize: 10,
                senderId: senderId ? senderId : null
            }
        };
    },
    props({ownProps:{senderId},allMessagesQuery:{loading,allMessages,fetchMore,refetch,subscribeToMore}}){
        let {page,pageSize,hasMore,ChatMessage}= allMessages? allMessages: {};
        return {
            loading,
            page:page? page: 1,
            pageSize:pageSize ? pageSize: 10,
            hasMore,
            ChatMessage,
            loadMore(page){
                return fetchMore({
                    variables:{
                        page,
                        pageSize,
                        senderId
                    },
                    updateQuery:(previousResult,{fetchMoreResult})=>{
                        if(!fetchMoreResult){
                            return previousResult;
                        }
                        const result =  Object.assign({},previousResult,{
                            allMessages:Object.assign({},previousResult.allMessages,fetchMoreResult.allMessages,{
                                ChatMessage:[...previousResult.allMessages.ChatMessage, ...fetchMoreResult.allMessages.ChatMessage]
                            })
                        });
                        return result;
                    }
                });
            },
            subscribeToMore(senderId1,senderId2){
              return subscribeToMore({
                document: CHAT_MESSAGE_SUBSCRIPTION,
                variables:{
                    senderId1,
                    senderId2
                },
                updateQuery: (previousState, {subscriptionData}) => {
                  if (!subscriptionData.data){
                          return previousState;
                  }
                  const newMessage = subscriptionData.data.messageAdded

                  const result =  Object.assign({},previousState,{
                            allMessages:Object.assign({},previousState.allMessages,previousState.allMessages,{
                                ChatMessage:[...previousState.allMessages.ChatMessage, newMessage]
                            })
                        });            

                  return result;
                },
                onError: (err) => console.error(err),
              });
            },            
            refetch
        }
    }

})

export {createChatMessageMutation,chatMessageQuery};