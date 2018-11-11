<template>
    <b-container>
        <h1>Student Dashboard</h1>
        <b-button :to="`/student/${this.$store.state.user.id}/courses`">Courses</b-button>
    </b-container>
</template>

<script>
export default {
    name: 'StudentDashboard'
};
</script>

<style scoped>

</style>
