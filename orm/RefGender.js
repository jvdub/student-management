const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');

const RefGender = sqlz.define('ref_sex', {
    id: {
        field: 'ref_sex_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    description: {
        field: 'description',
        type: Sequelize.TEXT
    },
    code: {
        field: 'code',
        type: Sequelize.TEXT
    },
    definition: {
        field: 'definition',
        type: Sequelize.TEXT
    },
    jurisdictionId: {
        field: 'ref_jurisdiction_id',
        type: Sequelize.INTEGER
    },
    sortOrder: {
        field: 'sort_order',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = RefGender;
