const express = require('express');
const user = require('../api/user');
const okta = require('../okta');
let router = express.Router();

router.get('/api/user/', okta.authenticationRequired, function(req, res) {
    user.getPersonFromLoginIdentifier(req.jwt.claims.sub, res);
});

router.post('/api/user', okta.authenticationRequired, (req, res) => {
    user.createNewUser(req, res);
});

module.exports = router;
