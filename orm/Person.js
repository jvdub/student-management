const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');
const OrganizationPersonRole = require('./OrganizationPersonRole');

const Person = sqlz.define('person', {
    id: {
        field: 'person_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        field: 'first_name',
        type: Sequelize.TEXT
    },
    middleName: {
        field: 'middle_name',
        type: Sequelize.TEXT
    },
    lastName: {
        field: 'last_name',
        type: Sequelize.TEXT,
        allowNull: false
    },
    generationCode: {
        field: 'generation_code',
        type: Sequelize.TEXT
    },
    gender: {
        field: 'ref_sex_id',
        type: Sequelize.INTEGER
    },
    prefix: {
        type: Sequelize.TEXT
    },
    birthdate: {
        type: Sequelize.DATE
    },
    hispanicLatinoEthnicity: {
        field: 'hispanic_latino_ethnicity',
        type: Sequelize.BOOLEAN
    },
    usCitizenshipStatus: {
        field: 'ref_uscitizenship_status_id',
        type: Sequelize.INTEGER
    },
    visaType: {
        field: 'ref_visa_type_id',
        type: Sequelize.INTEGER
    },
    state: {
        field: 'ref_state_of_residence_id',
        type: Sequelize.INTEGER
    },
    proofOfResidencyType: {
        field: 'ref_proof_of_residency_type_id',
        type: Sequelize.INTEGER
    },
    highestEducationLevelCompleted: {
        field: 'ref_highest_education_level_completed_id',
        type: Sequelize.INTEGER
    },
    personalInformationVerificationId: {
        field: 'ref_personal_information_verification_id',
        type: Sequelize.INTEGER
    },
    birthdateVerification: {
        field: 'birthdate_verification',
        type: Sequelize.TEXT
    },
    tribalAffilication: {
        field: 'ref_tribal_affiliation_id',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Person.hasOne(OrganizationPersonRole, { foreignKey: 'person_id' });

Person.belongsToMany(Person, {
    as: 'parent',
    through: 'student_parent',
    timestamps: false,
    foreignKey: 'student_id'
});
Person.belongsToMany(Person, {
    as: 'student',
    through: 'student_parent',
    timestamps: false,
    foreignKey: 'parent_id'
});

module.exports = Person;
