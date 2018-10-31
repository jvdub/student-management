const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');

const LearningPlan = sqlz.define('learning_plan_subject', {
    id: {
        field: 'learning_plan_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    learningPlanId: {
        field: 'learning_plan_id',
        type: Sequelize.INTEGER
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

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
LearningPlan.sync().then(() => {
    console.log('LearningPlan Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing LearningPlan table.');
});

module.exports = LearningPlan;
