<template>
    <b-container fluid>
        <h1>Create New User</h1>
        <label for="first-name">First Name</label>
        <b-form-input id="first-name" type="text" v-model="firstName"></b-form-input>
        <label for="middle-name">Middle Name</label>
        <b-form-input id="middle-name" type="text" v-model="middleName"></b-form-input>
        <label for="last-name">Last Name</label>
        <b-form-input id="last-name" type="text" v-model="lastName"></b-form-input>
        <label for="email">Email</label>
        <b-form-input id="email" type="text" v-model="email"></b-form-input>
        <label for="birthdate">Birthdate</label>
        <b-form-input id="birthdate" type="text" v-model="birthdate"></b-form-input>
        <label for="gender">Gender</label>
        <b-form-select id="gender" text="Gender" v-model="gender" :options="genderOptions"></b-form-select>
        <b-button type="submit" @click="submit">Create</b-button>
    </b-container>
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

function getGenderOptions() {
    return execute('get', '/api/ref/gender');
}

export default {
    name: 'CreateUser',
    data() {
        return {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            birthdate: '',
            gender: 0,
            genderOptions: []
        };
    },
    async created() {
        this.refreshGenderOptions();
    },
    methods: {
        async refreshGenderOptions() {
            let genderData = await getGenderOptions();
            genderData.sort((a, b) => +a.sortOrder > +b.sortOrder);

            this.genderOptions = genderData.map((gender) => {
                return {
                    value: gender.id,
                    text: gender.description
                };
            });
        },
        submit() {
            let data = {
                profile: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    login: this.email
                }
            };

            return execute('post', '/api/user', data);
        }
    }
};
</script>

<style scoped>
</style>
