import db from '../models/index';
import {property} from 'lodash';
import { PubSub, withFilter } from 'graphql-subscriptions';
import PaginationHelper from  '../database/PaginationHelper';

export const type = `
    type ChatMessage{
        id:Int!
        SenderId:Int!
        ReceiverId:Int!
        content:String
        Sender:UserAccount
        Receiver:UserAccount
        createdAt:DateTime!
        updatedAt:DateTime
    }

    input InputChatMessage{
        id:Int
        SenderId:Int!
        ReceiverId:Int!
        content:String        
    }

    type ChatMessages{
        page:Int!
        pageSize:Int!
        totalRows:Int!
        hasMore:Boolean!
        ChatMessage:[ChatMessage]
    }
`

export const query =`
    ChatMessage:[ChatMessage]
    ChatMessage(senderId:Int,page:Int,pageSize:Int):ChatMessages
`;

export const mutation = `
    createChatMessage(chatMessage:InputChatMessage):ChatMessage
`;

export const subscription = `
    messageAdded(senderId1:Int!,senderId2:Int!):ChatMessage
    allMessageAdded(id:Int):ChatMessage
`;

export const pubsub = new PubSub();

const MESSAGE_ADDED_TOPIC = 'messageAdded';

export const resolver = {
    type:{
        ChatMessage:{
            id:property('id'),
            SenderId:property('SenderId'),
            ReceiverId:property('ReceiverId'),
            content:property('content'),
            createdAt:property('createdAt'),
            Sender:(chat)=>{
                return chat.getSender();
            },
            Receiver:(chat)=>{
                return chat.getReceiver();
            }
        }
    },
    query:{
        ChatMessage(_,{}){
            return db.sequelize.transaction(t=>{
                return db.ChatMessage.findAll();
            })
        },
        ChatMessage(_,{senderId,page,pageSize}){
            let where = {
                $or:{
                    SenderId:senderId,
                    ReceiverId:senderId
                }
            }

            return PaginationHelper.getResult({db,baseQuery:db.ChatMessage,page,pageSize,where,listKey:'ChatMessage'});
        }
    },
    mutation:{
        createChatMessage(_,{chatMessage}){
            let {SenderId,ReceiverId,content} = chatMessage ? chatMessage : {};
            return db.ChatMessage.create({SenderId,ReceiverId,content},{fields:['SenderId','ReceiverId','content']}).then((result)=>{
                pubsub.publish(MESSAGE_ADDED_TOPIC,{[MESSAGE_ADDED_TOPIC]:result,senderId1:result.SenderId,senderId2:result.ReceiverId});
                pubsub.publish('allMessageAdded',{allMessageAdded:result});
                return result;
            })
        }
    },
    subscription:{
        messageAdded:{
            subscribe: withFilter(()=> pubsub.asyncIterator(MESSAGE_ADDED_TOPIC),(payload,variables)=>{
                return (payload.senderId1 === variables.senderId1 && payload.senderId2 === variables.senderId2) || (payload.senderId1 === variables.senderId2 && payload.senderId2 === variables.senderId1);
            })
        },
        allMessageAdded:{
            subscribe: () => pubsub.asyncIterator('allMessageAdded')
        }
    }
};
