const Sequelize  = require('sequelize');
const sqlz = require('./db');

const StudentLearningPlan = sqlz.define('student_course_section', {
    data: {
        field: 'data',
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
StudentLearningPlan.sync({ force: true }).then(() => {
    console.log('StudentLearningPlan Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing StudentLearningPlan table.');
});

module.exports = StudentLearningPlan;
