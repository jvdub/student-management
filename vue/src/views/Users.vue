<template>
    <b-container>
        <b-button to="/create-user">Create New User</b-button>
        <b-list-group>
            <b-list-group-item v-for="user in users" v-bind:href="`/user/${user.id}`">{{`${user.lastName}, ${user.firstName}`}}</b-list-group-item>
        </b-list-group>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

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

            userData.sort((a, b) => a.lastName > b.lastName);

            this.users = userData.map((user) => {
                return {
                    id: user.id,
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
