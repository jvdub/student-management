const express = require('express');
const parent = require('../api/parent');
const okta = require('../okta');
let router = express.Router();

router.get('/api/parent/:parentId/students', okta.authenticationRequired, (req, res) => {
    parent.getStudentsFromParent(+req.params.parentId, res);
});

router.get('/api/parent', okta.authenticationRequired, (res) => {
    parent.getAllParents(res);
});

module.exports = router;
