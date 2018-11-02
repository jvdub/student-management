const Course = require('../orm/Course');
const CourseSection = require('../orm/CourseSection');
const Person = require('../orm/Person');
const utils = require('../utils');
const LearningPlan = require('../orm/LearningPlan');
const LearningPlanSubject = require('../orm/LearningPlanSubject');

module.exports = {
    getAllCourses(res) {
        Course.findAll({
            attributes: ['id', 'name', 'abbreviation']
        }).then((courses) => {
            res.send(courses);
        });
    },
    getCourse(courseId, res) {
        Course.findById(courseId).then((course) => {
            res.send(course);
        });
    },
    getCourseSections(courseId, res) {
        CourseSection.findAll({
            where: {
                course: courseId
            }
        }).then((sections) => {
            res.send(sections);
        });
    },
    getInstructorForSection(courseId, sectionId, res) {
        CourseSection.findOne({
            where: {
                course: courseId,
                id: sectionId
            }
        }).then((section) => {
            Person.findById(section.teacher).then((teacher) => {
                res.send(teacher);
            });
        });
    },
    async addNewLearningPlan(courseId, sectionId, req, res) {
        let body = JSON.parse(JSON.stringify(req.body));
        let plan = {
            courseSectionId: sectionId,
            theme: body.theme,
            weekDates: body.weekDates,
            weekNumber: body.weekNumber,
            classNumber: body.classNumber
        };
        let subjectsToSave = JSON.parse(JSON.stringify(body.subjects));
        let savedPlan = await LearningPlan.create(plan);

        for (let s of subjectsToSave) {
            let p = JSON.parse(JSON.stringify(savedPlan));
            s.learningPlanId = p.id;

            await LearningPlanSubject.create(s);
        }

        res.send(savedPlan);
    }
};
