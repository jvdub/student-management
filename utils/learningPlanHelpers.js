module.exports = {
    updatePlanDates(plan, effectiveDate, expiryDate) {
        plan.set('effectiveDate', effectiveDate);
        plan.set('expiryDate', expiryDate);
        return plan;
    },
    prepareSubjectsForStudentPlan(learningPlanSubjects) {
        return learningPlanSubjects.map((lps) => {
            return {
                id: lps.get('id'),
                name: lps.get('name'),
                monday: {
                    lesson: lps.get('monday'),
                    homework: false,
                    completed: false
                },
                tuesday: {
                    lesson: lps.get('tuesday'),
                    homework: false,
                    completed: false
                },
                wednesday: {
                    lesson: lps.get('wednesday'),
                    homework: false,
                    completed: false
                },
                thursday: {
                    lesson: lps.get('thursday'),
                    homework: false,
                    completed: false
                },
                friday: {
                    lesson: lps.get('friday'),
                    homework: false,
                    completed: false
                }
            };
        });
    },
    preparePlanForStudent(plan, studentId, subjects) {
        return {
            learningPlanId: plan.get('id'),
            studentId: studentId,
            sectionId: plan.get('courseSectionId'),
            weekNumber: plan.get('weekNumber'),
            weekDates: plan.get('weekDates'),
            classNumber: plan.get('classNumber'),
            theme: plan.get('theme'),
            expiryDate: plan.get('expiryDate'),
            subjects: subjects,
            readingTimes: {
                monday: null,
                tuseday: null,
                wednesday: null,
                thursday: null,
                friday: null
            }
        };
    }
};
