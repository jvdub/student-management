const express = require('express');
const course = require('../api/course');
const okta = require('../okta');
let router = express.Router();

router.get('/api/courses/', okta.authenticationRequired, function(req, res) {
    course.getAllCourses(res);
});

router.post('/api/course/:id/learning-plan', okta.authenticationRequired, function (req, res) {
    course.addNewLearningPlan(req.params.id, req, res);
});

module.exports = router;
