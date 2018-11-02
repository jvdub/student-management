<template>
    <b-container>
        <h1>Courses</h1>
        <b-list-group>
            <b-list-group-item v-for="course in courses" v-bind:href="`/course/${course.id}`">{{ course.name }}</b-list-group-item>
        </b-list-group>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getCourses() {
    return execute('get', '/api/courses');
}

export default {
    name: 'Courses',
    data() {
        return {
            courses: []
        };
    },
    async created() {
        this.refreshCourses();
    },
    methods: {
        async refreshCourses() {
            let courseData = await getCourses();

            courseData.sort((a, b) => a.name < b.name);

            this.courses = [].concat(courseData);
        }
    }
};
</script>

<style scoped>

</style>
