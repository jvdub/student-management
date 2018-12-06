import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '@okta/okta-vue';
import NotFoundComponent from '../views/NotFound.vue';
import LearningPlanList from '../views/LearningPlanList';
import LearningPlan from '../views/LearningPlan';
import CreateLearningPlan from '../views/CreateLearningPlan';
import Users from '../views/Users';
import User from '../views/User';
import Courses from '../views/Courses';
import CourseSections from '../views/CourseSections';
import CourseSection from '../views/CourseSection';
import CreateUser from '../views/CreateUser';
import StudentCourseList from '../views/StudentCourseList';
import StudentLearningPlan from '../views/StudentLearningPlan';
import ParentStudentList from '../views/ParentStudentList';

Vue.use(Router);

Vue.use(Auth, {
    issuer: 'https://dev-512457.oktapreview.com/oauth2/default',
    client_id: '0oaglgsgmfgpIX9X80h7',
    redirect_uri: 'https://apa-docket.herokuapp.com/implicit/callback', // Dev URL: 'http://localhost:3000/implicit/callback',
    scope: 'openid profile email'
});

let index = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/implicit/callback',
            component: Auth.handleCallback()
        },
        {
            path: '/course/:courseId/section/:sectionId/learning-plans/templates',
            name: 'learningplanlist',
            component: LearningPlanList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/course/:courseId/section/:sectionId/learning-plan/new',
            name: 'createlearningplan',
            component: CreateLearningPlan,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/course/:courseId/section/:sectionId/learning-plan/:learningPlanId',
            name: 'learningplan',
            component: LearningPlan,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/course/:courseId/section/:sectionId/student/:studentId/learningPlan/',
            name: 'studentlearningplan',
            component: StudentLearningPlan,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/user/:id',
            name: 'user',
            component: User,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/courses',
            name: 'courses',
            component: Courses,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/course/:id',
            name: 'coursesections',
            component: CourseSections,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/course/:courseId/section/:sectionId',
            name: 'coursesection',
            component: CourseSection,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/create-user',
            name: 'createuser',
            component: CreateUser,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/student/:studentId/courses',
            name: 'studentCourseList',
            component: StudentCourseList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/parent/:parentId/students',
            name: 'parentStudentList',
            component: ParentStudentList,
            meta: {
                requiresAuth: true
            }
        },
        {
            /* Everything else doesn't exist--show the 404. */
            path: '*',
            component: NotFoundComponent
        }
    ]
});

index.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default index;
