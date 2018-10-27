<template>
    <b-container>
        <b-row>
            <b-col>
                <img src="https://www.americanprep.org/wp-content/uploads/2014/06/aps_logo1.png"/>
            </b-col>
            <b-col>
                <h1>{{ grade }} Learning Plan</h1>
                <h4>{{ teacher }}</h4>
            </b-col>
            <b-col>
                <p>Week of:</p>
                <p><b-form-input type="text" placeholder="This week's dates"></b-form-input></p>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <p><b-form-input type="text" placeholder="Student's Name"></b-form-input></p>
            </b-col>
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
        <b-row>
            <b-col>
                <p>Reading Group</p>
            </b-col>
            <b-col>
                <b-form-input type="text" placeholder="Lesson" label="Lesson: "></b-form-input>
            </b-col>
            <b-col>
                <b-form-input type="text" placeholder="Lesson" label="Lesson: "></b-form-input>
            </b-col>
            <b-col>
                <b-form-input type="text" placeholder="Lesson" label="Lesson: "></b-form-input>
            </b-col>
            <b-col>
                <b-form-input type="text" placeholder="Lesson" label="Lesson: "></b-form-input>
            </b-col>
            <b-col>
                <b-form-input type="text" placeholder="Lesson" label="Lesson: "></b-form-input>
            </b-col>
        </b-row>
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

export default {
    name: 'CreateLearningPlan',
    data() {
        return {
            grade: 'Kindergarten',
            teacher: 'Mrs. Doe',
            weekDates: 'Sept 10-14',
            studentName: 'John Van Wagenen',
            classNumber: 1,
            theme: 'ENTHUSIASM'
        };
    }
};
</script>

<style scoped>

</style>
