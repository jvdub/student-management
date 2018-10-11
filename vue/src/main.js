import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    created() {
        this.isAuthenticated();
    },
    watch: {
        // Everytime the route changes, check for auth status
        '$route': 'isAuthenticated'
    },
    methods: {
        async isAuthenticated() {
            store.dispatch({
                type: 'authenticate',
                authenticated: await this.$auth.isAuthenticated()
            });
        }
    },
    render: h => h(App)
}).$mount('#app');
