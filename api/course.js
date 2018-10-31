const Course = require('../orm/Course');
const utils = require('../utils');
const LearningPlan = require('../orm/LearningPlan');

module.exports = {
    getAllCourses(res) {
        Course.findAll({
            attributes: ['id', 'name', 'abbreviation']
        }).then((courses) => {
            res.send(courses);
        });
    },
    addNewLearningPlan(courseId, req, res) {
        const plan = utils.cloneObject(req.body);

        res.send(LearningPlan.create(plan));
    }
};
