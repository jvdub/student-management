<template>
    <b-container>
        <h1>{{ course.name }}</h1>
        <b-button :href="`/course/${courseId}/section/${sectionId}/learning-plans/templates`">View Learning Plan Templates</b-button>
        <h1>Students</h1>
        <b-btn v-b-modal.studentModal>Add Student</b-btn>
        <b-list-group>
            <b-list-group-item v-for="student of studentsInSection">{{ student.lastName }}, {{student.firstName}}</b-list-group-item>
        </b-list-group>
        <b-modal id="studentModal" title="Add Student" @ok="addStudent">
            <b-form-select v-model="selected" v-bind:options="students"></b-form-select>
        </b-modal>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getCourse() {
    return execute('get', `/api/course/${this.courseId}`);
}

async function getStudents() {
    return execute('get', '/api/students');
}

async function getStudentsInSection() {
    return execute('get', `/api/course/${this.courseId}/sections/${this.sectionId}/student`);
}

async function addStudentToSection(data) {
    return execute('post', `/api/course/${this.courseId}/sections/${this.sectionId}/student`, data);
}

export default {
    name: 'CourseSection',
    data() {
        return {
            courseId: this.$route.params.courseId,
            sectionId: this.$route.params.sectionId,
            course: {},
            studentsInSection: [],
            students: [],
            selected: ''
        };
    },
    async created() {
        this.refreshCourse();
        this.refreshStudentsInSection();
        this.refreshAllStudents();
    },
    methods: {
        async refreshCourse() {
            this.course = await getCourse.apply(this);
        },
        async refreshStudentsInSection() {
            this.studentsInSection = await getStudentsInSection.apply(this);
        },
        async refreshAllStudents() {
            let students = await getStudents.apply(this);
            students.sort((a, b) => a.lastName < b.lastName);

            this.students = students.map((s) => {
                return {
                    value: s.id,
                    text: `${s.lastName}, ${s.firstName}`
                };
            });
        },
        async addStudent() {
            let studentAdded = await addStudentToSection.call(this, {
                studentId: this.selected
            });

            this.students.concat(studentAdded);

            this.refreshStudentsInSection();
        }
    }
};
</script>

<style scoped>

</style>
