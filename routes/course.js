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

router.get('/api/course/:courseId/sections/:sectionId/teacher', okta.authenticationRequired, function(req, res) {
    course.getInstructorForSection(req.params.courseId, req.params.sectionId, res);
});

router.post('/api/course/:courseId/sections/:sectionId/learning-plan', okta.authenticationRequired, function (req, res) {
    course.addNewLearningPlan(req.params.courseId, req.params.courseId, req, res);
});

module.exports = router;
