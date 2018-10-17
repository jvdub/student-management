import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authenticated: false,
        user: {}
    },
    mutations: {},
    getters: {
        isAuthenticated: state => state.authenticated,
        getUser: state => state.user
    },
    actions: {
        authenticate(state, authenticated) {
            state.authenticated = authenticated;
        },
        setUser(state, currentUser) {
            state.user = currentUser;
        }
    }
});
