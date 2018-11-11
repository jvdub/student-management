<template>
    <b-container>
        <h1>Parent Dashboard</h1>
        <b-button :to="`/parent/${this.$store.state.user.id}/students`">Students</b-button>
    </b-container>
</template>

<script>
export default {
    name: 'ParentDashboard'
};
</script>

<style scoped>

</style>
