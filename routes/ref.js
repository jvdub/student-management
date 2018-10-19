const express = require('express');
const refGender = require('../api/ref.gender');
const refState = require('../api/ref.state');
const refRole = require('../api/ref.role');
const okta = require('../okta');
let router = express.Router();

router.get('/api/ref/gender/', okta.authenticationRequired, function(req, res) {
    refGender.getGenders(res);
});

router.get('/api/ref/state/', okta.authenticationRequired, function(req, res) {
    refState.getStates(res);
});

router.get('/api/ref/role/', okta.authenticationRequired, function(req, res) {
    refRole.getRoles(res);
});

module.exports = router;
