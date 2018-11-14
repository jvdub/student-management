const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');
const Person = require('./Person');
const CourseSection = require('./CourseSection');

const StudentCourseSection = sqlz.define('student_course_section', {
    id: {
        field: 'student_course_section_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

StudentCourseSection.belongsTo(Person, { as: 'Student' });
StudentCourseSection.belongsTo(CourseSection, { as: 'CourseSection' });

module.exports = StudentCourseSection;
