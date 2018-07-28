/**
 * Created by ChitSwe on 2/25/17.
 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Site from './Site';
import UserProfile from './UserProfile';
import ProductDetail from './ProductDetail';
import Shipping from './Shipping';

export default ({client})=>{
    const store = createStore(
        combineReducers({
            Site,
            UserProfile,
            ProductDetail,
            Shipping,
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