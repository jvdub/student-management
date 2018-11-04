const Course = require('../orm/Course');
const CourseSection = require('../orm/CourseSection');
const Person = require('../orm/Person');
const utils = require('../utils');
const LearningPlan = require('../orm/LearningPlan');
const LearningPlanSubject = require('../orm/LearningPlanSubject');

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

        let teacher = await Person.findById(section.teacher);

        res.send(teacher);
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
    }
};
