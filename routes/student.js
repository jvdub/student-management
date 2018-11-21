const express = require('express');
const student = require('../api/student');
const okta = require('../okta');
let router = express.Router();

router.get('/api/students', okta.authenticationRequired, function(req, res) {
    student.getAllStudents(res);
});

router.get('/api/student/:studentId/course/:courseId/section/:sectionId/learning-plan/active', okta.authenticationRequired, function(req, res) {
    student.getActiveLearningPlan(+req.params.studentId, +req.params.courseId, +req.params.sectionId, res);
});

router.put('/api/student-learning-plan/:studentLearningPlanId', okta.authenticationRequired, function(req, res) {
    student.updateStudentLearningPlan(+req.params.studentLearningPlanId, req.body, res);
});

router.get('/api/student/:studentId/courses', okta.authenticationRequired, (req, res) => {
    student.getCoursesForStudent(+req.params.studentId, res);
});

module.exports = router;
