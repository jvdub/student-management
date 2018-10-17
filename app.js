const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');

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

const t = require('./routes/test');
app.use(t);

const user = require('./routes/user');
app.use(user);

const ref = require('./routes/ref');
app.use(ref);

app.use((req, res, next) => {
    // If no matching path, pass back to Vue to handle (likely to show 404 page).
    console.log('got to error catch');
    return res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = app;
