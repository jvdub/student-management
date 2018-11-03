const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const sqlz = require('./db');

const StudentCourseSections = sqlz.define('k12_student_course_section', {
    id: {
        field: 'organization_person_role_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    courseRepeatCode: {
        field: 'ref_course_repeat_code_id',
        type: Sequelize.INTEGER
    },
    enrollmentStatus: {
        field: 'ref_course_section_enrollment_status_type_id',
        type: Sequelize.INTEGER
    },
    entryType: {
        field: 'ref_course_section_entry_type_id',
        type: Sequelize.INTEGER
    },
    exitType: {
        field: 'ref_course_section_exit_type_id',
        type: Sequelize.INTEGER
    },
    exitOrWithdrawStatus: {
        field: 'ref_exit_or_withdraw_status_id',
        type: Sequelize.INTEGER
    },
    gradeLevelWhenCourseTaken: {
        field: 'ref_grade_level_when_course_taken_id',
        type: Sequelize.INTEGER
    },
    gradeEarned: {
        field: 'grade_earned',
        type: Sequelize.TEXT
    },
    gradeValueQualifier: {
        field: 'grade_value_qualifier',
        type: Sequelize.TEXT
    },
    numberOfCreditsAttempted: {
        field: 'number_of_credits_attempted',
        type: Sequelize.REAL(9, 2)
    },
    creditTypeEarned: {
        field: 'ref_credit_type_earned_id',
        type: Sequelize.INTEGER
    },
    additionalCreditTypeId: {
        field: 'ref_additional_credit_type_id',
        type: Sequelize.INTEGER
    },
    preAndPostTestIndicator: {
        field: 'ref_pre_and_post_test_indicator_id',
        type: Sequelize.INTEGER
    },
    progressLevel: {
        field: 'ref_progress_level_id',
        type: Sequelize.INTEGER
    },
    courseGpaApplicability: {
        field: 'ref_course_gpa_applicability_id',
        type: Sequelize.INTEGER
    },
    numberOfCreditsEarned: {
        field: 'number_of_credits_earned',
        type: Sequelize.REAL(9,2)
    },
    tuitionFunded: {
        field: 'tuition_funded',
        type: Sequelize.BOOLEAN
    },
    exitWithdrawalDate: {
        field: 'exit_withdrawal_date',
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// If testing locally, you may want to include `{ force: true }` in the call to `sync`.
// This option will wipe the DB and recreate it every time.
StudentCourseSections.sync().then(() => {
    console.log('StudentCourseSections Table successfully created/updated.');
}).catch(() => {
    console.log('Error syncing StudentCourseSections table.');
});

module.exports = StudentCourseSections;
