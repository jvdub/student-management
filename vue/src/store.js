import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authenticated: false
    },
    mutations: {},
    getters: {
        isAuthenticated: state => state.authenticated
    },
    actions: {
        authenticate(state, authenticated) {
            state.authenticated = authenticated;
        }
    }
});
