const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');
const LearningPlan = require('./LearningPlan');
const Course = require('./Course');

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
    }
}, {
    timestamps: false,
    freezeTableName: true
});

CourseSection.hasMany(LearningPlan);

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
CourseSection.sync().then(() => {
    console.log('Course Section Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing Course Section table.');
});

module.exports = CourseSection;
