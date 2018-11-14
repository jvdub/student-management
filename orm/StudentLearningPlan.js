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

module.exports = StudentLearningPlan;
