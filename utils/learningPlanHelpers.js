module.exports = {
    updatePlanDates(plan, effectiveDate, expiryDate) {
        plan.set('effectiveDate', effectiveDate);
        plan.set('expiryDate', expiryDate);
        return plan;
    },
    prepareSubjectsForStudentPlan(learningPlanSubjects) {
        return learningPlanSubjects.map((lps) => {
            return {
                name: lps.get('name'),
                monday: {
                    lesson: lps.get('monday'),
                    homework: false
                },
                tuesday: {
                    lesson: lps.get('tuesday'),
                    homework: false
                },
                wednesday: {
                    lesson: lps.get('wednesday'),
                    homework: false
                },
                thursday: {
                    lesson: lps.get('thursday'),
                    homework: false
                },
                friday: {
                    lesson: lps.get('friday'),
                    homework: false
                }
            };
        });
    },
    preparePlanForStudent(plan, studentId, subjects) {
        return {
            learningPlanId: plan.get('learningPlanId'),
            studentId: studentId,
            sectionId: plan.get('courseSectionId'),
            weekNumber: plan.get('weekNumber'),
            weekDates: plan.get('weekDates'),
            classNumber: plan.get('classNumber'),
            theme: plan.get('theme'),
            expiryDate: plan.get('expiryDate'),
            subjects: subjects
        };
    }
};
