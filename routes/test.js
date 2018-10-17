const express = require('express');
const okta = require('../okta');
let router = express.Router();

router.get('/api/test', okta.authenticationRequired, function(req, res, next) {
    res.send([ 'Testing 123!' ]);
});

module.exports = router;
