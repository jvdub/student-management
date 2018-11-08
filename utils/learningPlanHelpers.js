module.exports = {
    updatePlanDates(plan, effectiveDate, expiryDate) {
        plan.set('effectiveDate', effectiveDate);
        plan.set('expiryDate', expiryDate);
        return plan;
    }
};
