<template>
    <div class="create-learning-plan">
        <div class="row">
            <div class="col">
                <img src="https://www.americanprep.org/wp-content/uploads/2014/06/aps_logo1.png"/>
            </div>
            <div class="col">
                <h1><b-form-input type="text" placeholder="Grade"></b-form-input> Learning Plan</h1>
                <h4>{{teacher}}</h4>
            </div>
            <div class="col">
                <p>Week of:</p>
                <p><b-form-input type="text" placeholder="This week's dates"></b-form-input></p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p><b-form-input type="text" placeholder="Student's Name"></b-form-input></p>
            </div>
            <div class="col">
                <p>Class #: <b-form-input type="text" placeholder="Class Number"></b-form-input></p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h5>Builder's Theme: <b-form-input type="text" placeholder="Theme"></b-form-input></h5>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p>Subject</p>
            </div>
            <div class="col">
                <p>Monday</p>
            </div>
            <div class="col">
                <p>Tuesday</p>
            </div>
            <div class="col">
                <p>Wednesday</p>
            </div>
            <div class="col">
                <p>Thursday</p>
            </div>
            <div class="col">
                <p>Friday</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p>Reading Group</p>
            </div>
            <div class="col">
                <b-form-input type="text" placeholder="Lesson" label="Lesson: "></b-form-input>
            </div>
            <div class="col">
                <b-form-input type="text" placeholder="Lesson" label="Lesson: "></b-form-input>
            </div>
            <div class="col">
                <b-form-input type="text" placeholder="Lesson" label="Lesson: "></b-form-input>
            </div>
            <div class="col">
                <b-form-input type="text" placeholder="Lesson" label="Lesson: "></b-form-input>
            </div>
            <div class="col">
                <b-form-input type="text" placeholder="Lesson" label="Lesson: "></b-form-input>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
// import Vue from 'vue';
//
// const client = axios.create({
//     baseURL: 'http://localhost:3000/',
//     json: true
// });
//
// async function execute(method, resource, data) {
//     // inject the accessToken for each request
//     let accessToken = await Vue.prototype.$auth.getAccessToken();
//
//     return client({
//         method,
//         url: resource,
//         data,
//         headers: {
//             Authorization: `Bearer ${accessToken}`
//         }
//     }).then(req => {
//         return req.data;
//     });
// }

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
