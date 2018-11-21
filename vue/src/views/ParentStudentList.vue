<template>
    <b-container>
        <h1>Students</h1>
        <b-list-group>
            <b-list-group-item v-for="student of students">{{student.firstName}} {{student.middleName}} {{student.lastName}}</b-list-group-item>
        </b-list-group>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getAllStudentsForParent() {
    return execute('get', `/api/parent/${this.parentId}/students`);
}

export default {
    name: 'ParentStudentList',
    data() {
        return {
            parentId: +this.$route.params.parentId,
            students: []
        };
    },
    async created() {
        this.refreshStudentList();
    },
    methods: {
        async refreshStudentList() {
            this.students = await getAllStudentsForParent.apply(this);
        }
    }
};
</script>

<style scoped>

</style>
