<template>
    <div class="learning-plan-list">
        <b-button to="/learning-plan/new">Create New Learning Plan</b-button>
        <b-table striped hover :items="items"></b-table>
    </div>
</template>

<script>
export default {
    name: 'LearningPlanList',
    data() {
        return {
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
