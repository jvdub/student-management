<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/">My Vue App</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item to="/">Home</b-nav-item>
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
import { execute } from './http.js';

async function getUser() {
    return execute('get', '/api/user');
}

export default {
    name: 'app',
    async created() {
        await this.refreshActiveUser();
    },
    watch: {
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
