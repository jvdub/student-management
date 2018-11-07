const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');

const StudentCourseSection = sqlz.define('student_course_section', {
    id: {
        field: 'student_course_section_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    studentId: {
        field: 'student_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    courseSectionId: {
        field: 'course_section_id',
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
StudentCourseSection.sync({ force: true }).then(() => {
    console.log('StudentCourseSection Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing StudentCourseSection table.');
});

module.exports = StudentCourseSection;
