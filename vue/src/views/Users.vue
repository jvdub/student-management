<template>
    <div class="users">
        <b-button to="/create-user">Create New User</b-button>
        <b-table responsive striped hover :items="users"></b-table>
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

async function getUsers() {
    return execute('get', '/api/users');
}

export default {
    name: 'Users',
    data() {
        return {
            users: []
        };
    },
    async created() {
        this.refreshUsers();
    },
    methods: {
        async refreshUsers() {
            let userData = await getUsers();

            userData.sort((a, b) => a.lastName < b.lastName);

            this.users = userData.map((user) => {
                return {
                    lastName: user.lastName,
                    firstName: user.firstName
                };
            });
        }
    }
};
</script>

<style scoped>

</style>
