const express = require('express');
const student = require('../api/student');
const okta = require('../okta');
let router = express.Router();

router.get('/api/students', okta.authenticationRequired, function(req, res) {
    student.getAllStudents(res);
});

module.exports = router;
