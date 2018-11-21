<template>
    <b-container>
        <h1>Courses</h1>
        <b-list-group>
            <b-list-group-item>Course 1</b-list-group-item>
        </b-list-group>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getAllCoursesForStudent() {
    return execute('get', `/api/student/${this.studentId}/courses`);
}

export default {
    name: 'StudentCourseList',
    data() {
        return {
            studentId: +this.$route.params.studentId,
            courses: []
        };
    },
    async created() {
        this.refreshCourseList();
    },
    methods: {
        async refreshCourseList() {
            this.courses = await getAllCoursesForStudent.apply(this);
        }
    }
};
</script>

<style scoped>

</style>
