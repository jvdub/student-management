<template>
    <b-container>
        <h1>{{ course.name }}</h1>
        <b-button :href="`/course/${this.$route.params.courseId}/section/${this.$route.params.sectionId}/learning-plans/templates`">View Learning Plan Templates</b-button>
        <h1>Students</h1>
        <b-btn v-b-modal.studentModal>Add Student</b-btn>
        <b-list-group>
            <b-list-group-item>Test</b-list-group-item>
        </b-list-group>
        <b-modal id="studentModal" title="Add Student" @ok="addStudent">
            <b-form-select v-model="selected" v-bind:options="students"></b-form-select>
        </b-modal>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getCourse() {
    return execute('get', `/api/course/${this.$route.params.courseId}`);
}

async function getStudents() {
    return execute('get', '/api/students');
}

async function addStudentToSection(data) {
    return execute('post', `/api/course/${this.courseId}/section/${this.sectionId}/student`, data);
}

export default {
    name: 'CourseSection',
    data() {
        return {
            courseId: this.$route.params.courseId,
            sectionId: this.$route.params.sectionId,
            course: {},
            students: [],
            selected: ''
        };
    },
    async created() {
        this.refreshCourse();
        this.refreshStudents();
    },
    methods: {
        async refreshCourse() {
            this.course = await getCourse.apply(this);
        },
        async refreshStudents() {
            let students = await getStudents();
            students.sort((a, b) => a.lastName < b.lastName);

            this.students = students.map((s) => {
                return {
                    value: s.id,
                    text: `${s.lastName}, ${s.firstName}`
                }
            });
        },
        addStudent() {
            addStudentToSection({
                studentId: this.selected
            }).then((res) => {
                console.log(res);
            });
        }
    }
};
</script>

<style scoped>

</style>
