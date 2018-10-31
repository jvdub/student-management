<template>
    <b-container>
        <h1>{{ course.name }}</h1>
        <b-list-group>
            <b-list-group-item v-for="section in sections" v-bind:href="`/course/${courseId}/section/${section.id}`">{{ section.id }} - {{ section.teacher.lastName }}</b-list-group-item>
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

async function getCourse() {
    return execute('get', `/api/course/${this.courseId}`);
}

async function getSections() {
    return execute('get', `/api/course/${this.courseId}/sections`);
}

export default {
    name: 'CourseSections',
    data() {
        return {
            course: {},
            sections: [],
            courseId: this.$route.params.id
        };
    },
    async created() {
        this.refreshCourseAndSections();
    },
    methods: {
        async refreshCourseAndSections() {
            this.course = await getCourse.apply(this);
            this.sections = await getSections.apply(this);
        }
    }
};
</script>

<style scoped>

</style>
