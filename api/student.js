const OrganizationPersonRole = require('../orm/OrganizationPersonRole');
const Person = require('../orm/Person');
const Role = require('../orm/Role');
const StudentLearningPlan = require('../orm/StudentLearningPlan');
const StudentCourseSection = require('../orm/StudentCourseSection');
const LearningPlan = require('../orm/LearningPlan');
const CourseSection = require('../orm/CourseSection');
const Course = require('../orm/Course');

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
        let sent = false;
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
        let rawSections = await StudentCourseSection.findAll({
            where: {
                StudentId: studentId
            },
            include: [
                {
                    model: CourseSection,
                    as: 'CourseSection'
                }
            ]
        });

        let sections = [];

        for (let i = 0; i < rawSections.length; ++i) {
            let course = await Course.findById(rawSections[i].get('CourseSection').courseId);

            sections.push({
                id: rawSections[i].get('id'),
                CourseSectionId: rawSections[i].get('CourseSectionId'),
                CourseSection: rawSections[i].get('CourseSection'),
                course: course
            });
        }

        res.send(sections);
    }
};
