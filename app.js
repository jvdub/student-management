const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-512457.oktapreview.com/oauth2/default',
    assertClaims: {
        aud: 'api://default',
    },
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        return res.status(401).end();
    }

    const accessToken = match[1];

    return oktaJwtVerifier.verifyAccessToken(accessToken)
        .then((jwt) => {
            req.jwt = jwt;
            next();
        })
        .catch((err) => {
            res.status(401).send(err.message);
        });
}

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

const t = require('./routes/test');

app.use(t);

app.get('/api/test', (req, res) => {
    res.send('poop!');
});

app.use((req, res, next) => {
    console.log('got to error catch');
    return res.sendFile(path.join(__dirname, './public/index.html'));
});

// app.get('*', (req, res, next) => {
//     console.log('got to catchall');
//     return res.sendFile(path.join(__dirname, './public/index.html'));
// });

module.exports = app;
