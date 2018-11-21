<template>
    <b-container>
        <h1>Parent Dashboard</h1>
        <b-button :to="`/parent/${parent.person.id}/students`">Students</b-button>
    </b-container>
</template>

<script>
export default {
    name: 'ParentDashboard',
    data() {
        return {
            parent: this.$store.state.user
        };
    }
};
</script>

<style scoped>

</style>
