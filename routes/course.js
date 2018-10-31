const express = require('express');
const course = require('../api/course');
const okta = require('../okta');
let router = express.Router();

router.get('/api/courses/', okta.authenticationRequired, function(req, res) {
    course.getAllCourses(res);
});

router.get('/api/course/:id', okta.authenticationRequired, function(req, res) {
    course.getCourse(req.params.id, res);
});

router.get('/api/course/:id/sections', okta.authenticationRequired, function(req, res) {
    course.getCourseSections(req.params.id, res);
});

router.post('/api/course/:id/learning-plan', okta.authenticationRequired, function (req, res) {
    course.addNewLearningPlan(req.params.id, req, res);
});

module.exports = router;
