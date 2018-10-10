const express = require('express');
let router = express.Router();
const login = require('../api/login');

router.get('/login', function(req, res, next) {
    login.logIn(req).then((response) => {
        res.send(response);
    });
});

module.exports = router;
