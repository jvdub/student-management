const Course = require('../orm/Course');
const CourseSection = require('../orm/CourseSection');
const Person = require('../orm/Person');
const utils = require('../utils');
const LearningPlan = require('../orm/LearningPlan');
const LearningPlanSubject = require('../orm/LearningPlanSubject');
const StudentCourseSection = require('../orm/StudentCourseSection');

module.exports = {
    async getAllCourses(res) {
        let courses = await Course.findAll({
            attributes: ['id', 'name', 'abbreviation']
        });

        res.send(courses);
    },
    async getCourse(courseId, res) {
        let course = await Course.findById(courseId);
        res.send(course);
    },
    async getCourseSections(courseId, res) {
        let sections = await CourseSection.findAll({
            where: {
                courseId: courseId
            }
        });

        res.send(sections);
    },
    async getInstructorForSection(courseId, sectionId, res) {
        let section = await CourseSection.findOne({
            where: {
                courseId: courseId,
                id: sectionId
            }
        });

        let teacher = await Person.findById(section.teacherId);

        res.send(teacher);
    },
    async getStudentsForSection(courseId, sectionId, res) {
        let studentIds = await StudentCourseSection.findAll({
            attributes: [ 'studentId' ],
            where: {
                section_id: sectionId
            }
        });

        console.log('======================================');
        console.log(studentIds);
        console.log('======================================');

        let students = await Person.findAll({
            where: {
                id: {
                    [Op.in]: studentIds
                }
            }
        });

        console.log('======================================');
        console.log(students);
        console.log('======================================');

        res.send(students);
    },
    async getLearningPlans(sectionId, res) {
        let plans = await LearningPlan.findAll({
            where: {
                courseSectionId: sectionId
            }
        });

        res.send(plans);
    },
    async getLearningPlan(learningPlanId, res) {
        let plan = await LearningPlan.findById(learningPlanId);

        res.send(plan);
    },
    async getLearningPlanSubjects(learningPlanId, res) {
        let subjects = await LearningPlanSubject.findAll({
            where: {
                learningPlanId: learningPlanId
            }
        });

        res.send(subjects);
    },
    async addNewLearningPlan(courseId, sectionId, req, res) {
        let body = utils.cloneObject(req.body);
        let plan = {
            courseSectionId: sectionId,
            theme: body.theme,
            weekDates: body.weekDates,
            weekNumber: body.weekNumber,
            classNumber: body.classNumber
        };
        let subjectsToSave = utils.cloneObject(body.subjects);
        let savedPlan = await LearningPlan.create(plan);

        for (let s of subjectsToSave) {
            let p = utils.cloneObject(savedPlan);
            s.learningPlanId = p.id;

            await LearningPlanSubject.create(s);
        }

        res.send(savedPlan);
    },
    async activateLearningPlan(learningPlanId, newPlan, res) {
        let plan = await LearningPlan.findById(learningPlanId);
        plan.set('effectiveDate', newPlan.effectiveDate);
        plan.set('expiryDate', newPlan.expiryDate);

        plan = await plan.save();

        res.send(plan);
    }
};
