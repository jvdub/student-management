const express = require('express');
const user = require('../api/user');
let router = express.Router();

router.get('/api/user/', function(req, res, next) {
    user.getPersonFromLoginIdentifier(req.user.email, res);
});

module.exports = router;
