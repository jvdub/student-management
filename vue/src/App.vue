<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            <button v-if='this.$store.state.authenticated' class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" v-on:click='logout' id='logout-button'> Logout</button>
            <button v-else :click='login' class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id='login-button'> Login</button>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    methods: {
        login() {
            this.$auth.loginRedirect('/');
        },
        async logout() {
            await this.$auth.logout();
            await store.getters.isAuthenticated(store.state);

            // Navigate back to home
            this.$router.push({ path: '/' });
        }
    }
}
</script>

<style>
    @import '../node_modules/material-design-lite/dist/material.min.css';
    /* fallback */
    @font-face {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: 400;
        src: url(https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
    }

    .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>

<script defer src="../node_modules/material-design-lite/dist/material.min.js"></script>
