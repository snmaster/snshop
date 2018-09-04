import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import {List,ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import query from '../apollo/ProductCategory';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import { FloatingActionButton } from 'material-ui';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { blue600 } from 'material-ui/styles/colors';
import {chatMessageQuery,createChatMessageMutation} from '../apollo/ChatMessage';
class Chat extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {
            message:''
        };
    }

    componentDidMount() {
        
            this.unsubscribe=this.props.subscribeToMore(this.props.senderId,2);
                         
            let {ChatMessage} = this.props ? this. props : [];
        
          }
        
          componentWillReceiveProps(nextProps){
                
                let {ChatMessage} = this.props;
                let nextMessage = nextProps.ChatMessage;
        
                if(this.props.senderId !== nextProps.senderId)
                {
                    if(this.unsubscribe){
                      console.log('.......un scribe.....');
                      this.unsubscribe();
                    }
                    console.log('..................subscribe......');
                    this.unsubscribe=this.props.subscribeToMore(nextProps.senderId,2);
                }    
            }
        

    render(){
        let {senderId,createChatMessageMutation} = this.props;

        return (
            <div style={{width:'300px',height:'500px',marginLeft:'20px'}}>
                <div className="scrollable" style={{width:'100%',height:'90%',background:'gray'}}>
                </div>
                <textarea style={{width:'100%',height:'10%'}} placeholder="Type message" value={this.state.message} 
                    onChange={(e)=>{this.setState({message:e.target.value})}}
                    onKeyDown={(e)=>{
                        if(e.keyCode === 13){
                            createChatMessageMutation({
                                variables:{
                                    chatMessage:{
                                        content:this.state.message,
                                        SenderId:senderId,
                                        ReceiverId:2
                                    }
                                }
                            })
                        }
                    }}
                />       
            </div>            
        );
    }
}

const CustomerByIdQueryWrapper = compose(
    chatMessageQuery,
    createChatMessageMutation
  )(Chat);

  const TheComponent = ({userProfile,...props})=>{
    return <CustomerByIdQueryWrapper {...props} userProfile={userProfile} page={1} pageSize={10} />
  };
  
export default compose(
    connect(
        state=>({userProfile:state.UserProfile}),
        dispatch=>({

        })
    )
)(TheComponent);