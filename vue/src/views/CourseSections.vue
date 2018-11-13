<template>
    <b-container>
        <h1>{{ course.name }}</h1>
        <b-button :variant="'success'" v-b-modal.addSection>Add Section</b-button>
        <b-list-group>
            <b-list-group-item v-for="section in sections" v-bind:href="`/course/${courseId}/section/${section.id}`">{{ section.id }}</b-list-group-item>
        </b-list-group>
        <b-modal id="addSection" title="Activate Plan" @ok="addSection">
            <label v-bind:for="'section-teacher'">Teacher</label>
            <b-form-select v-model="teacherSelection" :options="teachers" id="section-teacher" />
        </b-modal>
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

async function getTeachers() {
    return execute('get', '/api/teachers');
}

export default {
    name: 'CourseSections',
    data() {
        return {
            course: {},
            sections: [],
            courseId: this.$route.params.id,
            teachers: [],
            teacherSelection: 0
        };
    },
    async created() {
        this.refreshCourseAndSections();
        this.refreshTeachers();
    },
    methods: {
        async refreshCourseAndSections() {
            this.course = await getCourse.apply(this);
            this.sections = await getSections.apply(this);
        },
        async refreshTeachers() {
            let teachers = await getTeachers();

            this.teachers = teachers.map((t) => {
                return {
                    value: t.id,
                    text: `${t.lastName}, ${t.firstName}`
                };
            });
        }
    }
};
</script>

<style scoped>

</style>
