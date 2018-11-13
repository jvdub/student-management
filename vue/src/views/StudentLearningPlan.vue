<template>
    <b-container>
        <h1>Student Learning Plan</h1>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getActivePlan() {
    return execute('get', `/api/student/${this.studentId}/course/${this.courseId}/section/${this.sectionId}/learning-plan/active`);
}

export default {
    name: 'StudentLearningPlan',
    data() {
        return {
            studentId: +this.$route.params.studentId,
            courseId: +this.$route.params.courseId,
            sectionId: +this.$route.params.sectionId,
            userRole: +this.$store.state.user.roleId,
            plan: {}
        };
    }
};
</script>

<style scoped>

</style>