const OrganizationPersonRole = require('../orm/OrganizationPersonRole');
const Person = require('../orm/Person');
const Role = require('../orm/Role');
const StudentLearningPlan = require('../orm/StudentLearningPlan');
const LearningPlan = require('../orm/LearningPlan');

module.exports = {
    async getAllStudents(res) {
        let studentRole = await Role.find({
            where: {
                name: 'Student'
            }
        });

        let studentsOrgRole = await OrganizationPersonRole.findAll({
            where: {
                roleId: studentRole.get('id')
            }
        });

        let students = [];

        for (let sor of studentsOrgRole) {
            let s = await Person.findById(sor.personId);
            students.push(s);
        }

        res.send(students);
    },
    async getActiveLearningPlan(studentId, courseId, sectionId, res) {
        let allPlans = await StudentLearningPlan.findAll({
            where: {
                StudentId: studentId
            },
            include: {
                model: LearningPlan
            }
        });

        for (let plan of allPlans) {
            let expiryDate = new Date(plan.get('learning_plan').get('expiryDate'));

            if (expiryDate - Date.now() > 0) {
                res.send(plan);
            }
        }

        res.sendStatus(404);
    }
};
