const Course = require('../orm/Course');
const CourseSection = require('../orm/CourseSection');
const utils = require('../utils');
const LearningPlan = require('../orm/LearningPlan');
const LearningPlanSubject = require('../orm/LearningPlanSubject');

module.exports = {
    getAllCourses(res) {
        Course.findAll({
            attributes: ['id', 'name', 'abbreviation']
        }).then((courses) => {
            res.send(courses);
        });
    },
    getCourse(courseId, res) {
        Course.findById(courseId).then((course) => {
            res.send(course);
        });
    },
    getCourseSections(courseId, res) {
        CourseSection.findAll({
            where: {
                course: courseId
            }
        }).then((sections) => {
            res.send(sections);
        });
    },
    addNewLearningPlan(courseId, req, res) {
        const plan = utils.cloneObject(req.body);
        let subjects = [];

        for (let s of plan.subjects) {
            subjects.push(LearningPlanSubject.create(s));
        }

        console.log(subjects);

        res.send(LearningPlan.create(plan));
    }
};
