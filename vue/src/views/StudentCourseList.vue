<template>
    <b-container>
        <h1>Courses</h1>
        <b-list-group>
            <b-list-group-item v-for="s of studentSections" v-bind:href="`/student/${studentId}/course/${s.courseSectionId}`">{{s.course.name}}</b-list-group-item>
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
            studentSections: []
        };
    },
    async created() {
        this.refreshCourseList();
    },
    methods: {
        async refreshCourseList() {
            this.studentSections = await getAllCoursesForStudent.apply(this);
        }
    }
};
</script>

<style scoped>

</style>
