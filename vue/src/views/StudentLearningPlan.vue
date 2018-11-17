<template>
    <b-container>
        <h1>Student Learning Plan</h1>
        <h2>{{student.person.lastName}}, {{student.person.firstName}} {{student.person.middleName}}</h2>
        <b-row>
            <b-col>
                <img src="https://www.americanprep.org/wp-content/uploads/2014/06/aps_logo1.png"/>
            </b-col>
            <b-col>
                <h1>{{ course }} Learning Plan</h1>
                <h4>{{ teacher }}</h4>
            </b-col>
            <b-col>
                <p>Week of: {{ plan.weekDates }}</p>
                <p>Week Number: {{ plan.weekNumber }}</p>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <p>Class #: {{ plan.classNumber }}</p>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h5>Builder's Theme: {{ plan.theme }}</h5>
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
        <b-row v-for="subject of plan.subjects">
            <b-col>
                <p>{{subject.name}}</p>
            </b-col>
            <b-col v-bind:class="{ 'has-incomplete-homework': (subject.monday.homework && !subject.monday.complete), 'has-complete-homework': (subject.monday.homework && subject.monday.complete) }">
                <p>{{subject.monday.lesson}}</p>
                <span v-if="$store.state.user.role.id === 1">
                    Homework? <b-form-checkbox v-bind:id="`monday-homework-${subject.id}`" v-model="subject.monday.homework"></b-form-checkbox>
                </span>
                <span v-if="$store.state.user.role.id === 3">
                    Homework Complete? <b-form-checkbox v-bind:id="'monday-hw-complete' + subject.id" v-model="subject.monday.complete"></b-form-checkbox>
                </span>
            </b-col>
            <b-col v-bind:class="{ 'has-incomplete-homework': (subject.tuesday.homework && !subject.tuesday.complete), 'has-complete-homework': (subject.tuesday.homework && subject.tuesday.complete) }">
                <p>{{subject.tuesday.lesson}}</p>
                <span v-if="$store.state.user.role.id === 1">
                    Homework? <b-form-checkbox v-bind:id="'tuesday-homework' + subject.id" v-model="subject.tuesday.homework"></b-form-checkbox>
                </span>
                <span v-if="$store.state.user.role.id === 3">
                    Homework Complete? <b-form-checkbox v-bind:id="'tuesday-hw-complete' + subject.id" v-model="subject.tuesday.complete"></b-form-checkbox>
                </span>
            </b-col>
            <b-col v-bind:class="{ 'has-incomplete-homework': (subject.wednesday.homework && !subject.wednesday.complete), 'has-complete-homework': (subject.wednesday.homework && subject.wednesday.complete) }">
                <p>{{subject.wednesday.lesson}}</p>
                <span v-if="$store.state.user.role.id === 1">
                    Homework? <b-form-checkbox v-bind:id="'wednesday-homework' + subject.id" v-model="subject.wednesday.homework"></b-form-checkbox>
                </span>
                <span v-if="$store.state.user.role.id === 3">
                    Homework Complete? <b-form-checkbox v-bind:id="'wednesday-hw-complete' + subject.id" v-model="subject.wednesday.complete"></b-form-checkbox>
                </span>
            </b-col>
            <b-col v-bind:class="{ 'has-incomplete-homework': (subject.thursday.homework && !subject.thursday.complete), 'has-complete-homework': (subject.thursday.homework && subject.thursday.complete) }">
                <p>{{subject.thursday.lesson}}</p>
                <span v-if="$store.state.user.role.id === 1">
                    Homework? <b-form-checkbox v-bind:id="'thursday-homework' + subject.id" v-model="subject.thursday.homework"></b-form-checkbox>
                </span>
                <span v-if="$store.state.user.role.id === 3">
                    Homework Complete? <b-form-checkbox v-bind:id="'thursday-hw-complete' + subject.id" v-model="subject.thursday.complete"></b-form-checkbox>
                </span>
            </b-col>
            <b-col v-bind:class="{ 'has-incomplete-homework': (subject.friday.homework && !subject.friday.complete), 'has-complete-homework': (subject.friday.homework && subject.friday.complete) }">
                <p>{{subject.friday.lesson}}</p>
                <span v-if="$store.state.user.role.id === 1">
                    Homework? <b-form-checkbox v-bind:id="'friday-homework' + subject.id" v-model="subject.friday.homework"></b-form-checkbox>
                </span>
                <span v-if="$store.state.user.role.id === 3">
                    Homework Complete? <b-form-checkbox v-bind:id="'friday-hw-complete' + subject.id" v-model="subject.friday.complete"></b-form-checkbox>
                </span>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getInstructor() {
    return execute('get', `/api/course/${this.courseId}/sections/${this.sectionId}/teacher`);
}

async function getCourse() {
    return execute('get', `/api/course/${this.courseId}`);
}

async function getStudentInfo() {
    return execute('get', `/api/user/${this.studentId}`);
}

async function getActivePlan() {
    return execute('get', `/api/student/${this.studentId}/course/${this.courseId}/section/${this.sectionId}/learning-plan/active`);
}

export default {
    name: 'StudentLearningPlan',
    data() {
        return {
            studentId: +this.$route.params.studentId,
            courseId: +this.$route.params.courseId,
            sectionId: +this.$route.params.sectionId,
            student: {},
            plan: {},
            planInfo: {
                id: 0,
                StudentId: 0,
                learningPlanId: 0
            },
            teacher: '',
            course: ''
        };
    },
    async created() {
        this.refreshStudentInfo();
        this.refreshActivePlan();
        this.refreshInstructorName();
        this.refreshCourseName();
    },
    methods: {
        async refreshStudentInfo() {
            this.student = await getStudentInfo.apply(this);
        },
        async refreshInstructorName() {
            let teacher = await getInstructor.apply(this);

            let title = teacher.gender === 1 ? 'Mr.' : 'Mrs.';
            this.teacher = `${title} ${teacher.lastName}`;
        },
        async refreshCourseName() {
            let course = await getCourse.apply(this);

            this.course = course.name;
        },
        async refreshActivePlan() {
            let p = await getActivePlan.apply(this);

            this.plan = JSON.parse(p.data);
            this.planInfo.id = p.id;
            this.planInfo.StudentId = p.StudentId;
            this.planInfo.learningPlanId = p.learningPlanId;
        }
    }
};
</script>

<style scoped>
.has-incomplete-homework {
    background-color: darkorange;
}
.has-complete-homework {
    background-color: green;
}
</style>
