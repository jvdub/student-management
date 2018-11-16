const express = require('express');
const teacher = require('../api/teacher');
const okta = require('../okta');
let router = express.Router();

router.get('/api/teachers', okta.authenticationRequired, function(req, res) {
    teacher.getAllTeachers(res);
});

module.exports = router;
