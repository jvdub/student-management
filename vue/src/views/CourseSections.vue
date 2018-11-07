<template>
    <b-container>
        <h1>{{ course.name }}</h1>
        <b-list-group>
            <b-list-group-item v-for="section in sections" v-bind:href="`/course/${courseId}/section/${section.id}`">{{ section.id }}</b-list-group-item>
        </b-list-group>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

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
