import React from 'react';
import {Route,IndexRoute} from 'react-router';
import Layout from './layout';
import Home from './components/home';
import ProductCategory from "./components/Category/index";
import ProductBrowser from "./components/Product/index";
import Login from "./components/login";

export default (
    <Route component={Layout} path="/authorize">
        <IndexRoute component={Home}/>
        <Route component={ProductCategory} path="/authorize/category"/>
        <Route component={ProductBrowser} path="/authorize/product"/>
        <Route component={Login} path="/authorize/login"/>
    </Route>
);
