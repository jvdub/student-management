const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');
const LearningPlan = require('./LearningPlan');

const CourseSection = sqlz.define('course_section', {
    id: {
        field: 'section_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    teacherId: {
        field: 'teacher_id',
        type: Sequelize.INTEGER
    },
    courseId: {
        field: 'course_id',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});

CourseSection.hasMany(LearningPlan);

module.exports = CourseSection;
