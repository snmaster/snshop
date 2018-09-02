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
import Chat from './Chat';
class ChatPopup extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {
            open:false
        };
    }

    render(){
        let {open,anchorEl,userId} = this.props;

        return (
            <div>
                <Popover
                    canAutoPosition={false}
                    targetOrigin={{vertical:'bottom',horizontal:'right'}}
                    anchorOrigin={{vertical:'top',horizontal:'right'}}
                    popoverProps={{style:{height:'500px',width:'300px',padding:'10px'}}}
                    open={open}
                    anchorEl={anchorEl}
                    useLayerForClickAway={false}
                >
                    <Chat senderId={userId ? Number(userId): null} page={10} pageSize={10} />
                </Popover>
            </div>
            
        );
    }
}

export default compose(
    withRouter,
    connect(
        state=>({open:state.Site.isChatPopoverOpen,anchorEl:state.Site.chatPopoverTarget,userId:state.UserProfile.userId}),
        dispatch=>({
            onPopoverChange:(open)=>{
                if(open)
                    dispatch({type:'CHAT_POPOVER_OPEN'});
                else
                    dispatch({type:'CHAT_POPOVER_CLOSE'});
            },
            onPopoverToggle:()=>{
                dispatch({type:'CHAT_POPOVER_TOGGLE'});
            }
        })
    )
)(ChatPopup);