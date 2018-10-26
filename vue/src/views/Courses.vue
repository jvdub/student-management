<template>
    <b-container>
        <h1>Courses</h1>
        <b-list-group>
            <b-list-group-item v-for="course in courses" v-bind:href="`/course/${course.id}`">{{ course.name }}</b-list-group-item>
        </b-list-group>
    </b-container>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

const client = axios.create({
    baseURL: 'http://localhost:3000/',
    json: true
});

async function execute(method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken();

    return client({
        method,
        url: resource,
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(req => {
        return req.data;
    });
}

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
