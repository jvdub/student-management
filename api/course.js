const Course = require('../orm/Course');

module.exports = {
    getAllCourses(res) {
        Course.findAll({
            attributes: ['id', 'name', 'abbreviation']
        }).then((courses) => {
            res.send(courses);
        });
    }
};
