/**
 * Created by ChitSwe on 2/25/17.
 */
import React from 'react';
import {Route,IndexRoute} from 'react-router';
import Layout from './layout';
import Home from './components/home';
import ProductBrowser from './components/Product/index';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Cart/Cart';
import CheckOut from './components/Checkout/index';
import OrderBrowser from './components/CustomerOrder/index';
import OrderDetail from './components/CustomerOrder/OrderDetail';
import ConfirmOrder from './components/CustomerOrder/confirmOrder';
export default (
    <Route onChange={(p,n)=>{
        if(window.en === 'production'){
            setTimeout(()=>{gtag('config','UA-125686595-1',{'page_path':n.location.pathname,'page_title':document.title,'page_location':window.location.href});},1000);
        }
    }} component={Layout} path="/">
        <IndexRoute component={Home}/>
        <Route component={ProductBrowser} path="/Product(/:id)"/>
        <Route component={ProductDetail} path="/detail(/:id)"/>
        <Route component={Cart} path="/checkout/cart" />
        <Route component={CheckOut} path="/checkout/process"/>
        <Route component={OrderBrowser} path="/customer/order"/>
        <Route component={OrderDetail} path="/customer/order/detail(/:id)"/>
        <Route component={ConfirmOrder} path="/customer/confirmOrder"/>
    </Route>
);