import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'isomorphic-fetch';
import 'babel-polyfill';
import routes from './routes';
import { Router, browserHistory } from 'react-router';
import Preference from '../../common/Preference';
import  '../../common/dateUtils';
import Accounting from 'accounting';
import {ApolloProvider} from 'react-apollo';
import createApolloClient from '../../common/createApolloClient';
import { createNetworkInterface } from 'apollo-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {default as theme} from '../../common/adminMuiTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createStore from './reducer/createAdminStore';
import {getAccessToken} from "../auth";    
injectTapEventPlugin();
Accounting.settings = {
    currency: Preference.format.currency,
    number: Preference.format.number
};


const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
        credentials: 'same-origin',
    },
    transportBatching: true,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const token = getAccessToken();
    req.options.headers['authorization'] = token ? `Bearer ${token}` : null;
    next();
  }
}]);

networkInterface.useAfter([{
  applyAfterware({ response }, next) {
    if (response.status === 401) {
      console.log('Un authorize');
    }
    next();
  }
}]);

const client = createApolloClient({
    networkInterface: networkInterface,
    initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
    ssrForceFetchDelay: 100,
});



const store = createStore({client});
render(
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <ApolloProvider client={client} store={store}>
            <Router history={browserHistory} >
                {routes}
            </Router>
        </ApolloProvider>
    </MuiThemeProvider>
    , document.getElementById("content"));