const Sequelize  = require('sequelize');
const sqlz = require('./db');

const Announcement = sqlz.define('announcement', {
    learningPlanId: {
        field: 'learning_plan_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    announcement: {
        field: 'announcement',
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Announcement;
