const express = require('express');
const user = require('../api/user');
const okta = require('../okta');
let router = express.Router();

router.get('/api/parent/:parentId/students', okta.authenticationRequired, function(req, res) {
    user.getAllUsers(res);
});

module.exports = router;
