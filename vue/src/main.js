import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
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
