import React from 'react';
import {Route,IndexRoute} from 'react-router';
import Layout from './layout';
import Home from './components/home';
import ProductCategory from "./components/Category/index";
import Login from "./components/login";

export default (
    <Route component={Layout} path="/admin">
        <IndexRoute component={Home}/>
        <Route component={ProductCategory} path="/admin/category"/>
        <Route component={Login} path="/admin/login"/>
    </Route>
);
