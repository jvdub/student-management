const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');
const CourseSection = require('./CourseSection');

const Course = sqlz.define('course', {
    id: {
        field: 'course_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        field: 'description',
        type: Sequelize.TEXT
    },
    abbreviation: {
        field: 'abbreviation',
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Course.hasMany(CourseSection, { as: 'sections' });

module.exports = Course;
