const OrganizationPersonRole = require('../orm/OrganizationPersonRole');
const Person = require('../orm/Person');
const Role = require('../orm/Role');
const StudentLearningPlan = require('../orm/StudentLearningPlan');
const StudentCourseSection = require('../orm/StudentCourseSection');
const LearningPlan = require('../orm/LearningPlan');
const CourseSection = require('../orm/CourseSection');

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
        let sent = false;

        for (let plan of allPlans) {
            let expiryDate = new Date(plan.get('learning_plan').get('expiryDate'));

            if (expiryDate - Date.now() > 0) {
                res.send(plan);
                sent = true;
                break;
            }
        }

        if (!sent) {
            res.sendStatus(404);
        }
    },
    async updateStudentLearningPlan(studentLearningPlanId, plan, res) {
        let currentPlan = await StudentLearningPlan.findById(studentLearningPlanId);

        currentPlan.set('data', JSON.stringify(plan));

        let updatedPlan = await currentPlan.save();

        res.send(updatedPlan);
    },
    async getCoursesForStudent(studentId, res) {
        let sections = await StudentCourseSection.findAll({
            where: {
                studentId: studentId
            },
            include: [
                {
                    model: Person,
                    as: 'Student'
                },
                {
                    model: CourseSection,
                    as: 'CourseSection'
                }
            ]
        });

        res.send(sections);
    }
};
