const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');

const LearningPlanSubject = sqlz.define('learning_plan_subject', {
    id: {
        field: 'learning_plan_subject_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    learningPlanId: {
        field: 'learning_plan_id',
        type: Sequelize.INTEGER,
    },
    name: {
        field: 'name',
        type: Sequelize.TEXT
    },
    monday: {
        field: 'monday',
        type: Sequelize.TEXT
    },
    tuesday: {
        field: 'tuesday',
        type: Sequelize.TEXT
    },
    wednesday: {
        field: 'wednesday',
        type: Sequelize.TEXT
    },
    thursday: {
        field: 'thursday',
        type: Sequelize.TEXT
    },
    friday: {
        field: 'friday',
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = LearningPlanSubject;
