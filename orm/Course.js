const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');

const Course = sqlz.define('course', {
    id: {
        field: 'course_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        field: 'description',
        type: Sequelize.TEXT
    },
    abbreviation: {
        field: 'abbreviation',
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
Course.sync().then(() => {
    console.log('Course Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing Course table.');
});

module.exports = Course;
