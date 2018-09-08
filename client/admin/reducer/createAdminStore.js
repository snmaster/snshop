/**
 * Created by ChitSwe on 1/25/17.
 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import AdminSite from './AdminSite';
import Login from "./Login";
import Category from "./Category";
import UserProfile from './UserProfile';

export default ({client})=>{
    const store = createStore(
        combineReducers({
            csrf:state=>(state?state:''),
            AdminSite,
            Login,
            Category,
            UserProfile,
            apollo: client.reducer()
        }),
        client.initialState, // initial state
        compose(
            applyMiddleware(client.middleware()),
            // If you are using the devToolsExtension, you can add it here also
            typeof window !=='undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    return store;
};


