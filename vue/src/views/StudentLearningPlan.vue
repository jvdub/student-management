<template>
    <b-container>
        <h1>Student Learning Plan</h1>
        <p v-if="this.$store.state.user.role.id === 1">Teacher view</p>
        <p v-if="this.$store.state.user.role.id === 2">Student view</p>
        <p v-if="this.$store.state.user.role.id === 3">Parent view</p>
        <p>{{plan.theme}}</p>
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
            plan: {}
        };
    },
    async created() {
        this.refreshActivePlan();
    },
    methods: {
        async refreshActivePlan() {
            let p = await getActivePlan.apply(this);

            this.plan = JSON.parse(p.data);
        }
    }
};
</script>

<style scoped>

</style>
