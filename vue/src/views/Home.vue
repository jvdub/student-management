<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <p>Student Management</p>
        <p v-if="this.$store.state.authenticated">You done it, {{`${this.$store.state.user.person.firstName} ${this.$store.state.user.person.lastName}`}}!</p>
        <p v-if="this.$store.state.authenticated">You are a {{user.role.name}}.</p>
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

function getMessage() {
    return execute('get', '/api/user');
}

export default {
    name: 'home',
    data() {
        return {
            user: null,
            loading: false
        };
    },
    async created() {
        this.refreshMessage();
    },
    methods: {
        async refreshMessage() {
            this.loading = true;
            this.user = await getMessage();
            this.loading = false;
        }
    }
};
</script>
