<template>
    <b-container>
        <h1>{{ course.name }}</h1>
        <b-button :href="`/course/${this.$route.params.courseId}/section/${this.$route.params.sectionId}/learning-plans/templates`">View Learning Plan Templates</b-button>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getCourse() {
    return execute('get', `/api/course/${this.$route.params.courseId}`);
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
            this.course = await getCourse.apply(this);
        }
    }
};
</script>

<style scoped>

</style>
