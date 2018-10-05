import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Feedback from './views/Feedback.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: Feedback
        },
        {
            path: '/responses',
            name: 'responses',
            component: () => import(/* webpackChunkName: "responses" */ './views/Responses.vue')
        }
    ]
});
