const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const LearningPlanSubject = require('./LearningPlanSubject');
const sqlz = require('./db');

const LearningPlan = sqlz.define('learning_plan', {
    id: {
        field: 'learning_plan_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    courseSectionId: {
        field: 'course_section_id',
        type: Sequelize.INTEGER
    },
    theme: {
        field: 'theme',
        type: Sequelize.TEXT
    },
    weekDates: {
        field: 'week_dates',
        type: Sequelize.TEXT
    },
    weekNumber: {
        field: 'week_number',
        type: Sequelize.INTEGER
    },
    classNumber: {
        field: 'class_number',
        type: Sequelize.INTEGER
    },
    effectiveDate: {
        field: 'effective_date',
        type: Sequelize.DATE
    },
    expiryDate: {
        field: 'expiry_date',
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    freezeTableName: true
});

LearningPlan.hasMany(LearningPlanSubject, { as: 'subjects' });

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
LearningPlan.sync().then(() => {
    console.log('LearningPlan Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing LearningPlan table.');
});

module.exports = LearningPlan;
