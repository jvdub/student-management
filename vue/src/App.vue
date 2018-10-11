<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            <button v-if='this.$store.state.authenticated' v-on:click='logout' id='logout-button'> Logout</button>
            <button v-else :click='login' id='login-button'> Login</button>
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
