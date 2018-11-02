<template>
    <b-container>
        <h1>{{ user.person.lastName }}, {{ user.person.firstName }}</h1>
        <b-form>
            <b-row>
                <b-col>
                    <b-form-group id="first-name" label="First Name" label-for="first-name">
                        <b-form-input id="first-name" type="text" v-model="user.person.firstName" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group id="middle-name" label="Middle Name" label-for="middle-name">
                        <b-form-input id="middle-name" type="text" v-model="user.person.middleName"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group id="last-name" label="Last Name" label-for="last-name">
                        <b-form-input id="last-name" type="text" v-model="user.person.lastName"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row><b-row>
            <b-col>
                <b-form-group id="email" label="Email" label-for="email">
                    <b-form-input id="email" type="text" v-model="user.person.email" required></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="birthdate" label="Birthdate" label-for="birthdate">
                    <b-form-input id="birthdate" type="text" v-model="user.person.birthdate"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="gender" label="Gender" label-for="gender">
                    <b-form-select id="gender" text="Gender" v-model="user.person.gender"
                                   :options="genderOptions"></b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="state" label="State of Residence" label-for="state">
                    <b-form-select id="state" text="State of Residence" v-model="user.person.state"
                                   :options="stateOptions"></b-form-select>
                </b-form-group>
            </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group id="role" label="Role" label-for="role">
                        <b-form-select id="role" text="Role" v-model="user.role" :options="roleOptions"></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <!--<b-button type="submit" @click="submit">Create</b-button>-->
        </b-form>
    </b-container>
</template>

<script>
import { execute } from '../http.js';

async function getUser() {
    return execute('get', `/api/user/${this.$route.params.id}`);
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
    name: 'User',
    data() {
        return {
            user: {
                person: {},
                role: {}
            },
            genderOptions: [],
            stateOptions: [],
            roleOptions: []
        };
    },
    async created() {
        this.refreshUser();
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
        async refreshUser() {
            this.user = await getUser.apply(this);
        }
    }
};
</script>

<style scoped>

</style>
