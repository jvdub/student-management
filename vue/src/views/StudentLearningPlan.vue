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
                    Homework? <b-form-checkbox v-bind:id="`monday-homework-${subject.id}`" v-model="subject.monday.homework" @change="debouncePlanSaving"></b-form-checkbox>
                </span>
                <span v-if="$store.state.user.role.id === 3 && subject.monday.homework">
                    Homework Complete? <b-form-checkbox v-bind:id="`monday-homework-complete-${subject.id}`" v-model="subject.monday.complete" @change="debouncePlanSaving"></b-form-checkbox>
                </span>
            </b-col>
            <b-col v-bind:class="{ 'has-incomplete-homework': (subject.tuesday.homework && !subject.tuesday.complete), 'has-complete-homework': (subject.tuesday.homework && subject.tuesday.complete) }">
                <p>{{subject.tuesday.lesson}}</p>
                <span v-if="$store.state.user.role.id === 1">
                    Homework? <b-form-checkbox v-bind:id="`tuesday-homework-${subject.id}`" v-model="subject.tuesday.homework" @change="debouncePlanSaving"></b-form-checkbox>
                </span>
                <span v-if="$store.state.user.role.id === 3 && subject.tuesday.homework">
                    Homework Complete? <b-form-checkbox v-bind:id="`tuesday-homework-complete-${subject.id}`" v-model="subject.tuesday.complete" @change="debouncePlanSaving"></b-form-checkbox>
                </span>
            </b-col>
            <b-col v-bind:class="{ 'has-incomplete-homework': (subject.wednesday.homework && !subject.wednesday.complete), 'has-complete-homework': (subject.wednesday.homework && subject.wednesday.complete) }">
                <p>{{subject.wednesday.lesson}}</p>
                <span v-if="$store.state.user.role.id === 1">
                    Homework? <b-form-checkbox v-bind:id="`wednesday-homework-${subject.id}`" v-model="subject.wednesday.homework" @change="debouncePlanSaving"></b-form-checkbox>
                </span>
                <span v-if="$store.state.user.role.id === 3 && subject.wednesday.homework">
                    Homework Complete? <b-form-checkbox v-bind:id="`wednesday-homework-complete-${subject.id}`" v-model="subject.wednesday.complete" @change="debouncePlanSaving"></b-form-checkbox>
                </span>
            </b-col>
            <b-col v-bind:class="{ 'has-incomplete-homework': (subject.thursday.homework && !subject.thursday.complete), 'has-complete-homework': (subject.thursday.homework && subject.thursday.complete) }">
                <p>{{subject.thursday.lesson}}</p>
                <span v-if="$store.state.user.role.id === 1">
                    Homework? <b-form-checkbox v-bind:id="`thursday-homework-${subject.id}`" v-model="subject.thursday.homework" @change="debouncePlanSaving"></b-form-checkbox>
                </span>
                <span v-if="$store.state.user.role.id === 3 && subject.thursday.homework">
                    Homework Complete? <b-form-checkbox v-bind:id="`thursday-homework-complete-${subject.id}`" v-model="subject.thursday.complete" @change="debouncePlanSaving"></b-form-checkbox>
                </span>
            </b-col>
            <b-col v-bind:class="{ 'has-incomplete-homework': (subject.friday.homework && !subject.friday.complete), 'has-complete-homework': (subject.friday.homework && subject.friday.complete) }">
                <p>{{subject.friday.lesson}}</p>
                <span v-if="$store.state.user.role.id === 1">
                    Homework? <b-form-checkbox v-bind:id="`friday-homework-${subject.id}`" v-model="subject.friday.homework" @change="debouncePlanSaving"></b-form-checkbox>
                </span>
                <span v-if="$store.state.user.role.id === 3 && subject.friday.homework">
                    Homework Complete? <b-form-checkbox v-bind:id="`friday-homework-complete-${subject.id}`" v-model="subject.friday.complete" @change="debouncePlanSaving"></b-form-checkbox>
                </span>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <p>Reading Time</p>
            </b-col>
            <b-col>
                <b-form-input type="number" placeholder="Time spent reading" id="monday-reading" v-model="plan.readingTimes.monday" @input="debouncePlanSaving"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input type="number" placeholder="Time spent reading" id="tuesday-reading" v-model="plan.readingTimes.tuesday" @input="debouncePlanSaving"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input type="number" placeholder="Time spent reading" id="wednesday-reading" v-model="plan.readingTimes.wednesday" @input="debouncePlanSaving"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input type="number" placeholder="Time spent reading" id="thursday-reading" v-model="plan.readingTimes.thursday" @input="debouncePlanSaving"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input type="number" placeholder="Time spent reading" id="friday-reading" v-model="plan.readingTimes.friday" @input="debouncePlanSaving"></b-form-input>
            </b-col>
        </b-row>
        <h3>Announcements</h3>
        <b-row v-for="a of announcements">
            <p>{{a.announcement}}</p>
        </b-row>
    </b-container>
</template>

<script>
import { execute } from '../http.js';
import { debounce } from '../debounce.js';
import LearningPlanAnnouncement from '../components/LearningPlanAnnouncement';

async function getInstructor(courseId, sectionId) {
    return execute('get', `/api/course/${courseId}/sections/${sectionId}/teacher`);
}

async function getCourse(courseId) {
    return execute('get', `/api/course/${courseId}`);
}

async function getStudentInfo(studentId) {
    return execute('get', `/api/user/${studentId}`);
}

async function getActivePlan(studentId, courseId, sectionId) {
    return execute('get', `/api/student/${studentId}/course/${courseId}/section/${sectionId}/learning-plan/active`);
}

async function updateCurrentPlan(planId, updatedPlan) {
    return execute('put', `/api/student-learning-plan/${planId}`, updatedPlan);
}

async function getLearningPlanAnnouncements(courseId, sectionId, learningPlanId) {
    return execute('get', `/api/course/${courseId}/sections/${sectionId}/learning-plan/${learningPlanId}/announcements`);
}

export default {
    name: 'StudentLearningPlan',
    components: {
        LearningPlanAnnouncement
    },
    data() {
        return {
            studentId: +this.$route.params.studentId,
            courseId: +this.$route.params.courseId,
            sectionId: +this.$route.params.sectionId,
            student: {
                person: {
                    firstName: '',
                    middleName: '',
                    lastName: ''
                }
            },
            plan: {
                readingTime: {
                    monday: null,
                    tuseday: null,
                    wednesday: null,
                    thursday: null,
                    friday: null
                }
            },
            announcements: [],
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
        this.debouncePlanSaving = debounce(this.savePlan, 1000);
    },
    methods: {
        async refreshStudentInfo() {
            this.student = await getStudentInfo(this.studentId);
        },
        async refreshInstructorName() {
            let teacher = await getInstructor(this.courseId, this.sectionId);

            let title = teacher.gender === 1 ? 'Mr.' : 'Mrs.';
            this.teacher = `${title} ${teacher.lastName}`;
        },
        async refreshCourseName() {
            let course = await getCourse(this.courseId);

            this.course = course.name;
        },
        async refreshActivePlan() {
            let p = await getActivePlan(this.studentId, this.courseId, this.sectionId);

            this.plan = JSON.parse(p.data);
            this.announcements = [];
            this.planInfo.id = p.id;
            this.planInfo.StudentId = p.StudentId;
            this.planInfo.learningPlanId = p.learningPlanId;
            this.refreshLearningPlanAnnouncements();
        },
        async refreshLearningPlanAnnouncements() {
            let announcements = await getLearningPlanAnnouncements(this.courseId, this.sectionId, this.planInfo.learningPlanId);

            for (let a of announcements) {
                this.announcements.push(a);
            }
        },
        async savePlan() {
            updateCurrentPlan(this.planInfo.id, this.plan);
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
