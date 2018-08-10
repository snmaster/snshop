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
const scriptUrl = env ==='production' ? "https://demyov6lprphd.cloudfront.net/site.bundle.js" : "/site.bundle.js";
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

    </head>
    <body>
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
