    /**
 * Created by ChitSwe on 12/19/16.
 */
import Express,{Router} from 'express';
import bodyParser from 'body-parser';
import './common/dateUtils';
import Accounting from 'accounting';
import Preference from './common/Preference';
import db from './server/models';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { formatError } from 'apollo-errors';
import { makeExecutableSchema } from 'graphql-tools';
import Schema from './server/data/schema';
import Resolver from './server/data/resolver';
import {default as migration} from './server/database/migration';
import React from 'react';
import ReactDOM from 'react-dom/server';
import routes from './client/admin/routes';
import siteRoutes from './client/site/routes';
import createApolloClient from './common/createApolloClient';
import { createNetworkInterface } from 'apollo-client';
import { match, RouterContext } from 'react-router';
import 'isomorphic-fetch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import injectTapEventPlugin from 'react-tap-event-plugin';
import webpack from 'webpack';
import devConfig from './webpack.dev';
import testConfig from './webpack.test';
import prodConfig from './webpack.prod';
import latency from 'express-simulate-latency';
import {default as adminTheme} from './common/adminMuiTheme';
import {default as siteTheme} from './common/siteMuiTheme';
import createAdminStore from './client/admin/reducer/createAdminStore';
import createSiteStore from './client/site/reducer/createSiteStore';
import cookieParser from 'cookie-parser';
injectTapEventPlugin();
import {default as AdminHtml} from './server/adminHtml';
import {default as SiteHtml} from './server/siteHtml';
import   './server/security/auth';
import passport from 'passport';
import fbaccountkit from './fbaccountkit';
import registerHandler from './server/security/register';
import {loginHandler} from './server/security/login';
import {adminSiteLoginHandler} from './server/security/login';
import {fbloginHandler} from './server/security/fblogin';
import {smsloginHandler} from './server/security/smslogin';
import proxy from 'proxy-middleware';
import url from "url";
import csrf from 'csurf';
import fs from 'fs';
import Mustache from 'mustache';
import path from 'path';
import {Helmet} from "react-helmet";
import favicon from "serve-favicon";
//require('./public/img/favicon.ico');
global.appRoot = path.resolve(__dirname);

const env = process.env.NODE_ENV;

console.log ( `Running with ${env} mode.`);
let webpackConfig= null;
switch(env){
    case "production":
        webpackConfig = prodConfig;
        break;
    case "development":
        webpackConfig = devConfig;
        break;
    case "test":
        webpackConfig = testConfig;
        break;
    default:
        webpackConfig = prodConfig;
        break;
}
Accounting.settings = {
    currency: Preference.format.currency,
    number: Preference.format.number
};
const app = new Express();
const appRouter = new Router();
//const port =env === 'test'? 3233: 3232;
const port = process.env.PORT ? process.env.PORT : 3232;
const proxyPort = 3230;
const graphqlUrl=`http://localhost:${port}/graphql`;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());
app.use(cookieParser());
app.disable('x-powered-by');
if(env==="development"){
    app.use(latency({ min: 100, max: 500 }));
    app.use('/admin.bundle.js',proxy(url.parse('http://localhost:' + proxyPort + '/public/admin.bundle.js')));
    app.use('/site.bundle.js',proxy(url.parse('http://localhost:' + proxyPort + '/public/site.bundle.js')));
    app.use('/admin.bundle.js.map',proxy(url.parse('http://localhost:' + proxyPort + '/public/admin.bundle.js.map')));
    app.use('/site.bundle.js.map',proxy(url.parse('http://localhost:' + proxyPort + '/public/site.bundle.js.map')));
}else if(env ==="production"){
    app.get('*.js', function (req, res, next) {
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      next();
    });
}else if(env==="test"){
    app.use('/admin.bundle.js',function (req, res, next) {
      req.url ='/admin.bundle.test.js'
      next();
    });
    app.use('/site.bundle.js',function (req, res, next) {
      req.url ='/site.bundle.test.js'
      next();
    });
    app.use('/admin.bundle.js.map',function (req, res, next) {
      req.url ='/admin.bundle.test.js.map'
      next();
    });
    app.use('/site.bundle.js.map',function (req, res, next) {
      req.url ='/site.bundle.test.js.map'
      next();
    });
}

const {account_kit} = fbaccountkit;

const csrfProtection = csrf({ cookie: true })

const schema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers:Resolver,
    allowUndefinedInResolve: true,
});

app.post('/graphql',passport.authenticate('bearer-graphql',{session:false}), apolloExpress( (req,res) => {
    return {
        schema,
        formatError,
        context: { user:req.user,httpResponse:res }
    }
}),(req,res)=>{

});

//if(env !=="production" ){
    // graphiql endpoint
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
    }));
//}

appRouter.get('/student',(req,res)=>{
    db.Student.findAll().then(data=>{
        res.json(
            data
        );
    }).catch(error=>{
        console.log(error);
        res.status(500).send(error.toString());
    })
});
app.use(Express.static('public'));
app.use(favicon(path.join(__dirname, 'public','img', 'shoppylife.ico')));
app.use('/api',appRouter);
function renderHtml(req,res,renderProps,isAdminSite){
    
    const client = createApolloClient({
        ssrMode: true,
        networkInterface: createNetworkInterface({
            uri: graphqlUrl,
            opts: {
                credentials: 'same-origin',
                // transfer request headers to networkInterface so that they're
                // accessible to proxy server
                // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
                headers: req.headers,
            },
        }),
    });
    let store = null;
    let muiTheme=null;
    let html = null;
    if(isAdminSite){//render admin site
        muiTheme = getMuiTheme(Object.assign({userAgent: req.headers['user-agent']},adminTheme));
        store = createAdminStore({client});
    }else{//render web site
        muiTheme = getMuiTheme(Object.assign({userAgent: req.headers['user-agent']},siteTheme));
        store = createSiteStore(({client}));
    }

    const component = (     
        <MuiThemeProvider muiTheme={muiTheme}>
            <ApolloProvider client={client} store={store}>
                <RouterContext {...renderProps} />
            </ApolloProvider>
        </MuiThemeProvider>
    );

    renderToStringWithData(component).then((content) => {
        const {apollo,...state}= client.store.getState();
        state.csrf=req.csrfToken();
        const data = apollo.data;
        res.status(200);
        const helmet = Helmet.renderStatic();

        const html = isAdminSite?
            (<AdminHtml
            content={content}
            state={Object.assign({ apollo: { data } },state)}
            helmet={helmet}
        />):
            (<SiteHtml
                content={content}
                state={Object.assign({ apollo: { data } },state)}
                muiTheme={siteTheme}
                helmet={helmet}
            />);
        res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
        res.end();
    }).catch(e => {
        console.error('RENDERING ERROR:', e);
        // bugsnag.notify(e,{
        //     request:req,
        //     errorName:"SSR_Failed",
        //     groupingHash:"SSR/RENDER",
        //     message:"Rendering html failed",
        //     severity: "error"
        // });
    });
}   

// app.use('/admin',(req, res) => {
//     req.headers.authorization =  `Bearer ${req.cookies.access_token}`;
//     match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
//         if (redirectLocation) {
//             res.redirect(redirectLocation.pathname + redirectLocation.search);
//         } else if (error) {
//             console.error('ADMIN ROUTER ERROR:', error); // eslint-disable-line no-console
//             res.status(500);
//         } else if (renderProps) {
//             renderHtml(req,res,renderProps,true);
//         } else {//admin routes not match
//             res.status(404).send('Not found');
//         }
//     });
// });

// app.get('/Login',(req,res)=>{
//     match({ routes:siteRoutes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
//         renderHtml(req,res,renderProps,false);
//     });
// });

app.get('/admin/Login',csrfProtection,(req,res)=>{
    match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
        renderHtml(req,res,renderProps,true);
    });
});

app.get('/register',csrfProtection, function(request, response){
    var view = {
      appId: account_kit.app_id,
      csrf: request.csrfToken(),
      version: account_kit.api_version,
    };
  
    var html = Mustache.to_html(fs.readFileSync(`${appRoot}/public/html/register.html`).toString(), view);
    response.send(html);
  });

app.post('/register',csrfProtection,registerHandler);
  
app.post('/login',csrfProtection,loginHandler);

app.post('/fblogin',csrfProtection,fbloginHandler);

app.post('/smslogin',csrfProtection,smsloginHandler);

app.post('/adminLogin',adminSiteLoginHandler);

app.get('/login',csrfProtection, function(request, response){
  var view = {
    appId: account_kit.app_id,
    csrf: request.csrfToken(),
    version: account_kit.api_version,
    redirectUrlOnSuccess:request.query.redirectUrlOnSuccess,
    message:request.query.message
  };
  var html = Mustache.to_html(fs.readFileSync(`${appRoot}/public/html/login.html`).toString(), view);
  response.send(html);
});

app.get('/ping',passport.authenticate('bearer-graphql',{session:false}),(req,res)=>{
    const {user} = req;
    let {isAuthenticated} = user? user:{};
    if(isAuthenticated){
        res.status(200).send("OK");
    }else
        res.status(401).send("Not authenticated");
});

app.get('/admin*',csrfProtection,passport.authenticate('cookie-admin',{session:false,failureRedirect:'/admin/Login'}),(req, res) => {
    req.headers.authorization =  `Bearer ${req.cookies.access_token}`;
    match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            console.error('ADMIN ROUTER ERROR:', error); // eslint-disable-line no-console
            res.status(500);
        } else if (renderProps) {
            renderHtml(req,res,renderProps,true);
        } else {//admin routes not match
            res.status(404).send('Not found');
        }
    });
});

app.get('*',csrfProtection,passport.authenticate('cookie-site',{session:false}),(req, res) => {
    if(req.user.isAuthenticated)
        req.headers.authorization =  `Bearer ${req.cookies.access_token}`;
    match({routes:siteRoutes,location:req.originalUrl},(error,redirectLocation,renderProps)=>{
               if(redirectLocation)
                   res.redirect(redirectLocation.pathname + redirectLocation.search);
               else if(error) {
                   console.error('SITE ROUTER ERROR:', error);
                   res.status(500);
               }else if(renderProps){
                   renderHtml(req,res,renderProps,false);//render site
               }else{
                   res.status(404).send('Not found');
               }
            });
});

// app.use((req, res) => {
//     if(!req.originalUrl.startsWith('/graphql')){
//         match({routes:siteRoutes,location:req.originalUrl},(error,redirectLocation,renderProps)=>{
//                    if(redirectLocation)
//                        res.redirect(redirectLocation.pathname + redirectLocation.search);
//                    else if(error) {
//                        console.error('SITE ROUTER ERROR:', error);
//                        res.status(500);
//                    }else if(renderProps){
//                        renderHtml(req,res,renderProps,false);//render site
//                    }else{
//                        res.status(404).send('Not found');
//                    }
//                 });
//     }
// });


function bundleWebpack(){
    console.log('Start webpack bundling');
    webpack(webpackConfig, function (err, stats) {
        if (err)
            console.log(err);
        else {
            console.log('Bundling finished.');
                migration.up().then((migrations) => {
                app.listen(port, () => {
                    console.log(`Server is running on port ${port}`);
                });
            });
        }
    });
}

migration.up().then((migrations) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


