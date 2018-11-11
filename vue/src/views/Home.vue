<template>
    <b-container>
        <img alt="Vue logo" src="../assets/logo.png">
        <p>Student Management</p>
        <student-dashboard v-if="this.$store.state.user.role.name === 'Student'"></student-dashboard>
        <parent-dashboard v-if="this.$store.state.user.role.name === 'Parent'"></parent-dashboard>
        <teacher-dashboard v-if="this.$store.state.user.role.name === 'Teacher'"></teacher-dashboard>
    </b-container>
</template>

<script>
import StudentDashboard from '../components/StudentDashboard';
import ParentDashboard from '../components/ParentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';
export default {
    name: 'home',
    components: {
        StudentDashboard,
        ParentDashboard,
        TeacherDashboard
    }
};
</script>
