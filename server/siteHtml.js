/**
 * Created by ChitSwe on 2/25/17.
 */
/**
 * Created by ChitSwe on 12/22/16.
 */
import React, { PropTypes } from 'react';
import Favicon from 'react-favicon';
import muiThemeable from 'material-ui/styles/muiThemeable';
const env = process.env.NODE_ENV ? process.env.NODE_ENV: 'production' ;
const scriptUrl = env ==='production' ? "https://demyov6lprphd.cloudfront.net/shoppylife.js" : "/shoppylife.js";
//const scriptUrl = "/site.bundle.js";
const siteHtml = ({ content, state,title,muiTheme }) => (
    <html lang="en">
    <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />   
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        <meta name="theme-color" content={muiTheme.palette.primary1Color}/>     
        <link rel="stylesheet" href="/style/flexboxgrid.min.css"  />
        <link rel="stylesheet" href="/style/sitestyle.css"/>
        <link rel="stylesheet" type="text/css" href="/style/csgrid.css"/>
        {/* <link rel="shortcut icon" href="/favicon/favicon.ico" /> */}

        <title>Shoppylife - Online Store</title>
        {/* {helmet.title.toComponent()} */}
        {
            env === 'production'?
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-125686595-1"/>
            :null            
        }
        {
            env==='production'?
        <script dangerouslySetInnerHTML={{__html:`
        window.env ='${env}';
        window.isSSR=true;
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-125686595-1');`}}/>
        :
        null
        }


    </head>
    <body>
    <div className="row" style={{background:'blue',height:'50px'}}>
        <div className="col-1"></div>   
        <div className="col-xs-5 col-md-2" style={{fontSize:'16px',fontStyle:'Bold',color:'white',borderRight:'1px solid',borderColor:'darkblue',paddingTop:'10px'}}>
        Welcome to Shoppylife!! 
        </div>
        <div className="col-xs-6 col-md-8" style={{fontSize:'16px',color:'white',borderRight:'1px solid',borderColor:'darkblue',paddingTop:'10px',float:'right'}}>
            (+959448025333)
        </div>
    </div>

    <div id="content" dangerouslySetInnerHTML={{ __html: content }} />

    <script
        dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${JSON.stringify(state)};` }}
        charSet="UTF-8"
    />
    <script src={scriptUrl} charSet="UTF-8" />

        
    </body>
    </html>
);

siteHtml.propTypes = {
    content: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default siteHtml;
