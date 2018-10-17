const express = require('express');
const user = require('../api/user');
const okta = require('../okta');
let router = express.Router();

router.get('/api/user/', okta.authenticationRequired, function(req, res) {
    let client = okta.getClient();
    client.getUser(req.jwt.claims.uid).then((user) => {
        console.log(user);
    });
    user.getPersonFromLoginIdentifier(req.jwt.claims.sub, res);
});

module.exports = router;
