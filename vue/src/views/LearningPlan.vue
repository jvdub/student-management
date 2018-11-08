<template>
    <b-container>
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
            <b-col>
                <b-button :variant="'success'" v-b-modal.activatePlan>Activate Plan</b-button>
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
        <learning-plan-subject v-for="subject of plan.subjects" :subject.sync="subject" v-bind:editable="false"></learning-plan-subject>
        <b-modal id="activatePlan" title="Activate Plan" @ok="activateLearningPlan">
            <label v-bind:for="'expiry-date'">Expiry Date</label>
            <b-form-input type="date" v-bind:id="'expiry-date'" v-model="plan.expiryDate"></b-form-input>
        </b-modal>
    </b-container>
</template>

<script>
import LearningPlanSubject from '../components/LearningPlanSubject';
import { execute } from '../http.js';

async function getInstructor() {
    return execute('get', `/api/course/${this.courseId}/sections/${this.sectionId}/teacher`);
}

async function getCourse() {
    return execute('get', `/api/course/${this.courseId}`);
}

async function getLearningPlan() {
    return execute('get', `/api/course/${this.courseId}/sections/${this.sectionId}/learning-plan/${this.learningPlanId}`);
}

async function getLearningPlanSubjects() {
    return execute('get', `/api/course/${this.courseId}/sections/${this.sectionId}/learning-plan/${this.learningPlanId}/subjects`);
}

async function sendActivateLearningPlan(data) {
    return execute('put', `/api/course/${this.courseId}/sections/${this.sectionId}/learning-plan/${this.learningPlanId}/activate`, data);
}

export default {
    name: 'LearningPlan',
    components: { LearningPlanSubject },
    data() {
        return {
            courseId: this.$route.params.courseId,
            sectionId: this.$route.params.sectionId,
            learningPlanId: this.$route.params.learningPlanId,
            course: '',
            teacher: '',
            plan: {
                id: '',
                weekNumber: '',
                weekDates: '',
                classNumber: '',
                theme: '',
                subjects: [],
                effectiveDate: null,
                expiryDate: null
            }
        };
    },
    async created() {
        this.refreshInstructorName();
        this.refreshCourseName();
        this.refreshLearningPlan();
    },
    methods: {
        async refreshLearningPlan() {
            let plan = await getLearningPlan.apply(this);
            plan.subjects = [];
            this.plan = plan;

            let subjects = await getLearningPlanSubjects.apply(this);

            for (let s of subjects) {
                s.edit = false;
                this.plan.subjects.push(s);
            }
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
        async activateLearningPlan() {
            await sendActivateLearningPlan.call(this, {
                id: this.plan.id,
                weekNumber: this.plan.weekNumber,
                weekDates: this.plan.weekDates,
                classNumber: this.plan.classNumber,
                theme: this.plan.theme,
                effectiveDate: this.plan.effectiveDate,
                expiryDate: this.plan.expiryDate
            });
        }
    }
};
</script>

<style scoped>

</style>