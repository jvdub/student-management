const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');

const Authentication = sqlz.define('authentication', {
    id: {
        field: 'authentication_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    organizationPersonRoleId: {
        field: 'organization_person_role_id',
        type: Sequelize.INTEGER
    },
    identityProviderName: {
        field: 'identity_provider_name',
        type: Sequelize.TEXT
    },
    identityProviderUri: {
        field: 'identity_provider_uri',
        type: Sequelize.TEXT
    },
    loginIdentifier: {
        field: 'login_identifier',
        type: Sequelize.TEXT
    },
    startDate: {
        field: 'start_date',
        type: Sequelize.DATE
    },
    endDate: {
        field: 'end_date',
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
Authentication.sync().then(() => {
    console.log('Authentication Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing Authentication table.');
});

module.exports = Authentication;
