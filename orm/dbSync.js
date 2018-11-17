const Authentication = require('./Authentication');
const Course = require('./Course');
const CourseSection = require('./CourseSection');
const LearningPlan = require('./LearningPlan');
const LearningPlanSubject = require('./LearningPlanSubject');
const OrganizationPersonRole = require('./OrganizationPersonRole');
const Person = require('./Person');
const RefGender = require('./RefGender');
const Role = require('./Role');
const State = require('./State');
const StudentCourseSection = require('./StudentCourseSection');
const StudentLearningPlan = require('./StudentLearningPlan');

async function syncTable(table, name) {
    try {
        // If testing locally, you may want to include `{ force: true }` in the call to `sync`.
        // This option will wipe the DB and recreate it every time.
        await table.sync();
        console.log(`${name} Table successfully created/updated.`);
    } catch (error) {
        console.log(`Error syncing ${name} Table`);
        console.log(error);
    }
}

async function sync() {
    await syncTable(Authentication, 'Authentication');
    await syncTable(OrganizationPersonRole, 'OrganizationPersonRole');
    await syncTable(Person, 'Person');
    await syncTable(RefGender, 'RefGender');
    await syncTable(Role, 'Role');
    await syncTable(State, 'State');
    await syncTable(Course, 'Course');
    await syncTable(CourseSection, 'CourseSection');
    await syncTable(LearningPlan, 'LearningPlan');
    await syncTable(LearningPlanSubject, 'LearningPlanSubject');
    await syncTable(StudentCourseSection, 'StudentCourseSection');
    await syncTable(StudentLearningPlan, 'StudentLearningPlan');
}

async function forceSync() {
    // await Authentication.sync({ force: true });
    // await Authentication.create({
    //     organizationPersonRoleId: 1,
    //     identityProviderName: "Okta",
    //     identityProviderUri: "https://dev-512457.oktapreview.com/oauth2/default",
    //     loginIdentifier: "jvanwagenen@mastercontrol.com",
    //     startDate: "1970-01-01 00:00:00-07",
    //     endDate: "2222-12-31 00:00:00-07"
    // });
    // await Authentication.create({
    //     organizationPersonRoleId: 2,
    //     identityProviderName: "Okta",
    //     identityProviderUri: "https://dev-512457.oktapreview.com/oauth2/default",
    //     loginIdentifier: "jtvanwage@gmail.com",
    //     startDate: "1970-01-01 00:00:00-07",
    //     endDate: "2222-12-31 00:00:00-07"
    // });
    // await StudentCourseSection.sync({ force: true });
    // await LearningPlan.sync({ force: true });
}

module.exports = sync;
