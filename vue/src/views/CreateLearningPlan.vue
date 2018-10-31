<template>
    <b-container>
        <b-form @submit="submit">
            <b-row>
                <b-col>
                    <img src="https://www.americanprep.org/wp-content/uploads/2014/06/aps_logo1.png"/>
                </b-col>
                <b-col>
                    <h1>{{ plan.grade }} Learning Plan</h1>
                    <h4>{{ plan.teacher }}</h4>
                </b-col>
                <b-col>
                    <p>Week of:</p>
                    <p><b-form-input type="text" placeholder="This week's dates" v-model="plan.weekDates"></b-form-input></p>
                    <p>Week Number:</p>
                    <p><b-form-input type="text" placeholder="This week's dates" v-model="plan.weekNumber"></b-form-input></p>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <p>Class #: <b-form-input type="text" placeholder="Class Number"></b-form-input></p>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h5>Builder's Theme: <b-form-input type="text" placeholder="Theme"></b-form-input></h5>
                </b-col>
            </b-row>
            <b-row>
                <b-button @click="addSubject">Add Subject</b-button>
            </b-row>
            <b-row>
                <b-col>
                    <p>Subject</p>
                </b-col>
                <b-col>
                    <p>Monday</p>
                </b-col>
                <b-col>
                    <p>Tuesday</p>
                </b-col>
                <b-col>
                    <p>Wednesday</p>
                </b-col>
                <b-col>
                    <p>Thursday</p>
                </b-col>
                <b-col>
                    <p>Friday</p>
                </b-col>
            </b-row>
            <learning-plan-subject v-for="subject of plan.subjects" :subject.sync="subject"></learning-plan-subject>
            <b-button type="submit">Submit</b-button>
        </b-form>
    </b-container>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import LearningPlanSubject from '../components/LearningPlanSubject';

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

export default {
    name: 'CreateLearningPlan',
    components: { LearningPlanSubject },
    data() {
        return {
            courseId: this.$route.params.id,
            plan: {
                grade: 'Kindergarten',
                teacher: 'Mrs. Doe',
                weekNumber: 1,
                weekDates: 'Sept 10-14',
                classNumber: 1,
                theme: 'ENTHUSIASM',
                subjects: []
            }
        };
    },
    methods: {
        submit() {
            return execute('post', `/api/course/${this.courseId}/learning-plan`, this.plan);
        },
        addSubject() {
            this.plan.subjects.push({
                name: '',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: '',
                edit: true
            });
        }
    }
};
</script>

<style scoped>

</style>
