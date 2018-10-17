const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');

const Role = sqlz.define('role', {
    id: {
        field: 'role_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        field: 'name',
        type: Sequelize.TEXT
    },
    jurisdictionId: {
        field: 'ref_jurisdiction_id',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
Role.sync().then(() => {
    console.log('Authentication Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing Authentication table.');
});

module.exports = Role;
