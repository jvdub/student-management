const express = require('express');
const parent = require('../api/parent');
const okta = require('../okta');
let router = express.Router();

router.get('/api/parent/:parentId/students', okta.authenticationRequired, function(req, res) {
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    parent.getStudentsFromParent(+req.params.parentId, res);
});

module.exports = router;
