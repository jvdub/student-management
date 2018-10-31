<template>
    <div class="learning-plan-list">
        <b-button :to="`/course/${courseId}/section/${sectionId}/learning-plan/new`">Create New Learning Plan Template</b-button>
        <b-table striped hover :items="items"></b-table>
    </div>
</template>

<script>
export default {
    name: 'LearningPlanList',
    data() {
        return {
            courseId: this.$route.params.courseId,
            sectionId: this.$route.params.sectionId,
            items: [
                {
                    week: 1,
                    course: 'Kindergarten'
                },
                {
                    week: 2,
                    course: 'Kindergarten'
                }
            ]
        };
    }
};
</script>

<style scoped>

</style>
