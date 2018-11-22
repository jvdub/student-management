const Course = require('../orm/Course');
const CourseSection = require('../orm/CourseSection');
const Person = require('../orm/Person');
const utils = require('../utils');
const learningPlanUtils = require('../utils/learningPlanHelpers');
const LearningPlan = require('../orm/LearningPlan');
const LearningPlanSubject = require('../orm/LearningPlanSubject');
const StudentCourseSection = require('../orm/StudentCourseSection');
const StudentLearningPlan = require('../orm/StudentLearningPlan');
const Announcement = require('../orm/Announcement');

async function getStudentsInCourseSections(courseSectionId) {
    return await StudentCourseSection.findAll({
        where: {
            CourseSectionId: courseSectionId
        },
        include: [ { model: Person, as: 'Student' } ]
    });
}

async function fetchLearningPlanSubjects(learningPlanId) {
    return await LearningPlanSubject.findAll({
        where: {
            learningPlanId: learningPlanId
        }
    });
}

module.exports = {
    async getAllCourses(res) {
        let courses = await Course.findAll({
            attributes: [ 'id', 'name', 'abbreviation' ]
        });

        res.send(courses);
    },
    async addCourse(newCourse, res) {
        let savedCourse = await Course.create(newCourse);

        res.send(savedCourse);
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
    async addCourseSection(sectionToAdd, res) {
        let newSection = await CourseSection.create(sectionToAdd);
        res.send(newSection);
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

        let students = await Person.findAll({
            where: {
                id: {
                    [ Op.in ]: studentIds
                }
            }
        });

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
        let subjects = await fetchLearningPlanSubjects(learningPlanId);

        res.send(subjects);
    },
    async getLearningPlanAnnouncements(learningPlanId, res) {
        let announcements = await Announcement.findAll({
            where: {
                learningPlanId: learningPlanId
            }
        });

        res.send(announcements);
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
    async activateLearningPlan(learningPlanId, expiryDate, res) {
        let plan = await LearningPlan.findById(learningPlanId);
        plan = learningPlanUtils.updatePlanDates(plan, Date.now(), expiryDate);

        plan = await plan.save();

        let lpSubjects = await fetchLearningPlanSubjects(plan.get('id'));
        let subjects = learningPlanUtils.prepareSubjectsForStudentPlan(lpSubjects);
        let studentsInSection = await getStudentsInCourseSections(plan.get('courseSectionId'));

        for (let studentSection of studentsInSection) {
            let p = {
                StudentId: studentSection.get('StudentId'),
                learningPlanId: plan.get('id'),
                data: JSON.stringify(learningPlanUtils.preparePlanForStudent(plan, studentSection.get('id'), subjects))
            };

            let slp = await StudentLearningPlan.create(p);
        }

        res.send(plan);
    },
    async cancelLearningPlan(learningPlanId, res) {
        let plan = await LearningPlan.findById(learningPlanId);
        plan = learningPlanUtils.updatePlanDates(plan, null, null);

        plan = await plan.save();

        res.send(plan);
    },
    async getStudentsInSection(courseSectionId, res) {
        let studentsWithSections = await getStudentsInCourseSections(courseSectionId);

        let students = studentsWithSections.map((s) => s.get('Student'));

        res.send(students);
    },
    async addStudentToSection(sectionId, studentId, res) {
        let studentSection = {
            StudentId: studentId,
            CourseSectionId: sectionId
        };

        let updatedStudentSection = await StudentCourseSection.create(studentSection);

        this.getStudentsInSection(updatedStudentSection.CourseSectionId, res);
    }
};
