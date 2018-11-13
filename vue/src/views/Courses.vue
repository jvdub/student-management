<template>
    <b-container>
        <h1>Courses</h1>
        <b-button :variant="'success'" v-b-modal.addCourse>Add New Course</b-button>
        <b-list-group>
            <b-list-group-item v-for="course in courses" v-bind:href="`/course/${course.id}`">{{ course.name }}</b-list-group-item>
        </b-list-group>
        <b-modal id="addCourse" title="Add Course" @ok="addCourse">
            <b-form-group horizontal label="Course Name" label-for="courseName">
                <b-form-input id="courseName" v-model="newCourse.name"></b-form-input>
            </b-form-group>
            <b-form-group horizontal label="Course Abbreviation" label-for="courseAbbreviation">
                <b-form-input id="courseAbbreviation" v-model="newCourse.abbreviation"></b-form-input>
            </b-form-group>
        </b-modal>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getCourses() {
    return execute('get', '/api/courses');
}

async function saveCourse(course) {
    return execute('post', '/api/courses', course);
}

export default {
    name: 'Courses',
    data() {
        return {
            courses: [],
            newCourse: {
                name: '',
                abbreviation: ''
            }
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
        },
        async addCourse() {
            let newCourse = await saveCourse(this.newCourse);
            this.courses.push(newCourse);
            refreshCourses();
        }
    }
};
</script>

<style scoped>

</style>
