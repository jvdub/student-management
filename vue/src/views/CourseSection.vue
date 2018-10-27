<template>
    <b-container>
        <h1>{{ course.name }}</h1>
        <b-button :href="`/course/${this.$route.params.id}/learning-plans/templates`">View Learning Plan Templates</b-button>
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
    return execute('get', `/api/course/${this.$route.params.id}`);
}

export default {
    name: 'CourseSection',
    data() {
        return {
            course: {}
        };
    },
    async created() {
        this.refreshCourse();
    },
    methods: {
        async refreshCourse() {
            this.course = await getCourse().apply(this);
        }
    }
};
</script>

<style scoped>

</style>
