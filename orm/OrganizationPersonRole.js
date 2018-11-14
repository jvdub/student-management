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

module.exports = OrganizationPersonRole;
