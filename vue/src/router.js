import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Auth from '@okta/okta-vue';
import NotFoundComponent from './views/404.vue';

Vue.use(Router);

Vue.use(Auth, {
    issuer: 'https://dev-512457.oktapreview.com/oauth2/default',
    client_id: '0oaglgsgmfgpIX9X80h7',
    redirect_uri: 'http://localhost:3000/implicit/callback',
    scope: 'openid profile email'
});

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/implicit/callback',
            component: Auth.handleCallback()
        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
        },
        {
            /* Everything else doesn't exist--show the 404. */
            path: '*',
            component: NotFoundComponent
        }
    ]
});
