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
        <label for="state">State of Residence</label>
        <b-form-select id="state" text="State of Residence" v-model="state" :options="stateOptions"></b-form-select>
        <label for="role">Role</label>
        <b-form-select id="role" text="Role" v-model="role" :options="roleOptions"></b-form-select>
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

function getStateOptions() {
    return execute('get', '/api/ref/state');
}

function getRoleOptions() {
    return execute('get', '/api/ref/role');
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
            genderOptions: [],
            state: '',
            stateOptions: [],
            role: '',
            roleOptions: []
        };
    },
    async created() {
        this.refreshGenderOptions();
        this.refreshStateOptions();
        this.refreshRoleOptions();
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
        async refreshStateOptions() {
            let stateData = await getStateOptions();

            this.stateOptions = stateData.map((state) => {
                return {
                    value: state.id,
                    text: state.description
                };
            });
        },
        async refreshRoleOptions() {
            let roleData = await getRoleOptions();

            this.roleOptions = roleData.map((role) => {
                return {
                    value: role.id,
                    text: role.name
                };
            });
        },
        submit() {
            let data = {
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                email: this.email,
                birthdate: this.birthdate,
                gender: this.gender,
                state: this.state,
                role: this.role
            };

            return execute('post', '/api/user', data);
        }
    }
};
</script>

<style scoped>
</style>
