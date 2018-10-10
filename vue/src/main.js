import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

Vue.use(Vuex);
