<template>
    <b-container>
        <b-button :to="`/course/${courseId}/section/${sectionId}/learning-plan/new`" variant="primary">Create New Learning Plan Template</b-button>
        <b-table striped hover :items="plans"></b-table>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getLearningPlans() {
    return execute('get', `/api/course/${this.courseId}/sections/${this.sectionId}/learning-plan`);
}

export default {
    name: 'LearningPlanList',
    data() {
        return {
            courseId: this.$route.params.courseId,
            sectionId: this.$route.params.sectionId,
            plans: [ ]
        };
    },
    async created() {
        this.refreshLearningPlanList();
    },
    methods: {
        async refreshLearningPlanList() {
            this.plans = await getLearningPlans.apply(this);
        }
    }
};
</script>

<style scoped>

</style>
