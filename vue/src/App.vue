<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/">My Vue App</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item to="/">Home</b-nav-item>
                    <b-nav-item to="/learning-plan" v-if="this.$store.state.authenticated">Learning Plans</b-nav-item>
                    <b-nav-item to="/create-user" v-if="this.$store.state.authenticated && this.$store.state.user.role.id === 1">Create User</b-nav-item>
                    <b-nav-item href="#" @click.prevent="login" v-if="!this.$store.state.authenticated">Login</b-nav-item>
                    <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <!-- routes will be rendered here -->
        <router-view />
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

const client = axios.create({
    baseURL: 'http://localhost:3000/',
    json: true
});

async function execute(method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken();

    return client({
        method,
        url: resource,
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(req => {
        return req.data;
    });
}

function getUser() {
    return execute('get', '/api/user');
}

export default {
    name: 'app',
    async created() {
        await this.refreshActiveUser();
    },
    watch: {
        // everytime a route is changed refresh the activeUser
        '$route': 'refreshActiveUser'
    },
    methods: {
        login() {
            this.$auth.loginRedirect();
        },
        async refreshActiveUser() {
            this.$store.state.user = await getUser();
            this.$store.state.authenticated = await this.$auth.getUser();
        },
        async logout() {
            await this.$auth.logout();
            await this.refreshActiveUser();
            this.$router.push('/');
        }
    }
};
</script>
