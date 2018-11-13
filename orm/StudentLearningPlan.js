const Sequelize  = require('sequelize');
const sqlz = require('./db');
const Person = require('./Person');
const LearningPlan = require('./LearningPlan');

const StudentLearningPlan = sqlz.define('student_learning_plan', {
    data: {
        field: 'data',
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

StudentLearningPlan.belongsTo(Person, { as: 'Student' });
StudentLearningPlan.belongsTo(LearningPlan);

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
StudentLearningPlan.sync().then(() => {
    console.log('StudentLearningPlan Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing StudentLearningPlan table.');
});

module.exports = StudentLearningPlan;
