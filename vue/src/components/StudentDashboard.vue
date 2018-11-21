<template>
    <b-container>
        <h1>Student Dashboard</h1>
        <b-button :to="`/student/${student.person.id}/courses`">Courses</b-button>
    </b-container>
</template>

<script>
export default {
    name: 'StudentDashboard',
    data() {
        return {
            student: this.$store.state.user
        };
    }
};
</script>

<style scoped>

</style>
