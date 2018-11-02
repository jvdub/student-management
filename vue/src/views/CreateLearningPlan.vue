<template>
    <b-container>
        <b-form @submit="submit">
            <b-row>
                <b-col>
                    <img src="https://www.americanprep.org/wp-content/uploads/2014/06/aps_logo1.png"/>
                </b-col>
                <b-col>
                    <h1>{{ course }} Learning Plan</h1>
                    <h4>{{ teacher }}</h4>
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
                    <p>Class #: <b-form-input type="text" placeholder="Class Number" v-model="plan.classNumber"></b-form-input></p>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h5>Builder's Theme: <b-form-input type="text" placeholder="Theme" v-model="plan.theme"></b-form-input></h5>
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
import LearningPlanSubject from '../components/LearningPlanSubject';
import { execute } from '../http.js';

async function getInstructor() {
    return execute('get', `/api/course/${this.courseId}/sections/${this.sectionId}/teacher`);
}

async function getCourse() {
    return execute('get', `/api/course/${this.courseId}`);
}

export default {
    name: 'CreateLearningPlan',
    components: { LearningPlanSubject },
    data() {
        return {
            courseId: this.$route.params.courseId,
            sectionId: this.$route.params.sectionId,
            course: '',
            teacher: '',
            plan: {
                weekNumber: 1,
                weekDates: 'Sept 10-14',
                classNumber: 1,
                theme: '',
                subjects: []
            }
        };
    },
    async created() {
        this.refreshInstructorName();
        this.refreshCourseName();
    },
    methods: {
        async refreshInstructorName() {
            let teacher = await getInstructor.apply(this);

            let title = teacher.gender === 1 ? 'Mr.' : 'Mrs.';
            this.teacher = `${title} ${teacher.lastName}`;
        },
        async refreshCourseName() {
            let course = await getCourse.apply(this);

            this.course = course.name;
        },
        submit() {
            return execute('post', `/api/course/${this.courseId}/sections/${this.sectionId}/learning-plan`, this.plan);
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
