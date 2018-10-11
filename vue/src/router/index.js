import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '@okta/okta-vue';
import NotFoundComponent from '../views/404.vue';

Vue.use(Router);

Vue.use(Auth, {
    issuer: 'https://dev-512457.oktapreview.com/oauth2/default',
    client_id: '0oaglgsgmfgpIX9X80h7',
    redirect_uri: 'http://localhost:3000/implicit/callback',
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
            path: '/dashboard',
            name: 'dashboard',
            component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
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