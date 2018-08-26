import React from 'react';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import {List,ListItem} from 'material-ui/List';
import query from '../apollo/ProductCategory';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

class NavDrawer extends React.Component{

    render(){
        let {open,ProductCategory,onDrawerChange,router} = this.props;

        return (
            <Drawer
                docked={false}
                width={300}
                open={open}
                onRequestChange={onDrawerChange}
            >
            <div className="layout">
                <div>				
                    <img className="img-responsive" src="https://res.cloudinary.com/djir3ki08/image/upload/v1517590917/shoppylife1_pxxz0z.png" style={{width:"100px",height:'80px'}} />										
                </div>
                <div style={{fontSize:'12px',textAlign:'center',verticalAlign:'middle',height:'35px',background:'blue',color:'white'}}>Category</div>
                <List style={{width:'100%'}}>
                    { ProductCategory? ProductCategory.map(p=>(<ListItem key={p.id} primaryText={p.Name} style={{height:'30px',fontSize:'11px'}} initiallyOpen={true} primaryTogglesNestedList={true} onClick={()=>{router.push(`/Product/${p.id}`);onDrawerChange(false);}}
                        nestedItems={p.SubCategories ? p.SubCategories.map(q=>(<ListItem key={q.id} style={{height:'30px',fontSize:'11px'}} initiallyOpen={false} primaryText={q.Name} onClick={()=>{router.push(`/Product/${q.id}`);onDrawerChange(false);}}
                            nestedItems={q.SubCategories ? q.SubCategories.map(r=>(<ListItem key={r.id} primaryText={r.Name} style={{height:'30px',fontSize:'11px'}} onClick={()=>{router.push(`/Product/${r.id}`);onDrawerChange(false);}}/>)) : null }
                        />)) : null }
                    />)):null
                }
                </List>
            </div>
            </Drawer>
        );
    }
}

export default compose(
    query,
    withRouter,
    connect(
        state=>({open:state.Site.isNavDrawerOpen}),
        dispatch=>({
            onDrawerChange:(open)=>{
                if(open)
                    dispatch({type:'SITE_NAV_DRAWER_OPEN'});
                else
                    dispatch({type:'SITE_NAV_DRAWER_CLOSE'});
            }
        })
    )
)(NavDrawer);