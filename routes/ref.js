const express = require('express');
const refGender = require('../api/ref.gender');
const okta = require('../okta');
let router = express.Router();

router.get('/api/ref/gender/', okta.authenticationRequired, function(req, res) {
    refGender.getGenders(res);
});

module.exports = router;
