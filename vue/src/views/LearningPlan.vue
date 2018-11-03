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
        <learning-plan-subject editable="false" v-for="subject of plan.subjects" v-bind:subject="subject"></learning-plan-subject>
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
                weekNumber: '',
                weekDates: '',
                classNumber: '',
                theme: '',
                subjects: []
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
            this.plan = await getLearningPlan.apply(this);
        },
        async refreshInstructorName() {
            let teacher = await getInstructor.apply(this);

            let title = teacher.gender === 1 ? 'Mr.' : 'Mrs.';
            this.teacher = `${title} ${teacher.lastName}`;
        },
        async refreshCourseName() {
            let course = await getCourse.apply(this);

            this.course = course.name;
        }
    }
};
</script>

<style scoped>

</style>
