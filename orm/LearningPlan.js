const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const LearningPlanSubject = require('./LearningPlanSubject');
const Announcement = require('./Announcement');
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
        type: Sequelize.DATE,
        set(date) {
            this.setDataValue('effectiveDate', date);
        }
    },
    expiryDate: {
        field: 'expiry_date',
        type: Sequelize.DATE,
        set(date) {
            this.setDataValue('expiryDate', date);
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

LearningPlan.hasMany(LearningPlanSubject, { as: 'subjects' });
LearningPlan.hasMany(Announcement, { as: 'announcements' });

module.exports = LearningPlan;
