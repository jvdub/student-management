const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const session = require('express-session');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-512457.oktapreview.com/oauth2/default',
    assertClaims: {
        aud: 'api://default',
    },
});

let upload = multer();
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'LONG_RANDOM_STRING_HERE_TO_BE_REPLACED_WITH_ENV_VAR-2135872:mashin\' the keyboard like nobody\'s bidniss.',
    resave: true,
    saveUninitialized: false
}));

app.use('/implicit/callback', (req, res, next) => {
    return res.sendFile(path.join(__dirname, './public/index.html'));
});

// verify JWT token middleware
app.use((req, res, next) => {
    // require every request to have an authorization header
    if (!req.headers.authorization) {
        return next(new Error('Authorization header is required'));
    }

    let parts = req.headers.authorization.trim().split(' ');
    let accessToken = parts.pop();

    oktaJwtVerifier.verifyAccessToken(accessToken)
        .then(jwt => {
            req.user = {
                uid: jwt.claims.uid,
                email: jwt.claims.sub
            };
            next();
        })
        .catch(next); // jwt did not verify!
});

const t = require('./routes/test');

app.use(t);

app.use((req, res, next) => {
    // If no matching path, pass back to Vue to handle (likely to show 404 page).
    console.log('got to error catch');
    return res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = app;
