const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');

const OrganizationPersonRole = sqlz.define('organization_person_role', {
    id: {
        field: 'organization_person_role_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    organizationId: {
        field: 'organization_id',
        type: Sequelize.INTEGER
    },
    personId: {
        field: 'person_id',
        type: Sequelize.INTEGER
    },
    roleId: {
        field: 'role_id',
        type: Sequelize.INTEGER
    },
    entryDate: {
        field: 'entry_date',
        type: Sequelize.DATE
    },
    exitDate: {
        field: 'exit_date',
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
OrganizationPersonRole.sync().then(() => {
    console.log('OrganizationPersonRole Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing OrganizationPersonRole table.');
});

module.exports = OrganizationPersonRole;
