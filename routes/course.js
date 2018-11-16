const express = require('express');
const course = require('../api/course');
const okta = require('../okta');
let router = express.Router();

router.get('/api/courses/', okta.authenticationRequired, function (req, res) {
    course.getAllCourses(res);
});

router.post('/api/courses/', okta.authenticationRequired, function (req, res) {
    course.addCourse(req.body, res);
});

router.get('/api/course/:id/sections', okta.authenticationRequired, function (req, res) {
    course.getCourseSections(+req.params.id, res);
});

router.post('/api/course/:id/sections', okta.authenticationRequired, function (req, res) {
    course.addCourseSection(req.body, res);
});

router.get('/api/course/:courseId/sections/:sectionId/teacher', okta.authenticationRequired, function (req, res) {
    course.getInstructorForSection(+req.params.courseId, +req.params.sectionId, res);
});

router.get('/api/course/:courseId/sections/:sectionId/student', okta.authenticationRequired, function (req, res) {
    course.getStudentsInSection(+req.params.sectionId, res);
});

router.post('/api/course/:courseId/sections/:sectionId/student', okta.authenticationRequired, function (req, res) {
    course.addStudentToSection(+req.params.sectionId, +req.body.studentId, res);
});

router.post('/api/course/:courseId/sections/:sectionId/learning-plan', okta.authenticationRequired, function (req, res) {
    course.addNewLearningPlan(+req.params.courseId, +req.params.sectionId, req, res);
});

router.get('/api/course/:courseId/sections/:sectionId/learning-plan', okta.authenticationRequired, function (req, res) {
    course.getLearningPlans(+req.params.sectionId, res);
});

router.get('/api/course/:courseId/sections/:sectionId/learning-plan/:learningPlanId', okta.authenticationRequired, function (req, res) {
    course.getLearningPlan(+req.params.learningPlanId, res);
});

router.get('/api/course/:courseId/sections/:sectionId/learning-plan/:learningPlanId/subjects', okta.authenticationRequired, function (req, res) {
    course.getLearningPlanSubjects(+req.params.learningPlanId, res);
});

router.put('/api/course/:courseId/sections/:sectionId/learning-plan/:learningPlanId/activate', okta.authenticationRequired, function (req, res) {
    course.activateLearningPlan(+req.params.learningPlanId, new Date(req.body.expiryDate), res);
});

router.put('/api/course/:courseId/sections/:sectionId/learning-plan/:learningPlanId/cancel', okta.authenticationRequired, function (req, res) {
    course.cancelLearningPlan(+req.params.learningPlanId, res);
});

router.get('/api/course/:id', okta.authenticationRequired, function (req, res) {
    course.getCourse(+req.params.id, res);
});

module.exports = router;
