<template>
    <b-row>
        <b-col>
            <b-button v-if="subject.edit" @click="toggleEdit" size="sm" class="save-btn">💾</b-button>
            <b-form-input v-if="subject.edit" type="text" placeholder="Subject" v-model="subject.name"></b-form-input>
            <p>
                <b-button v-if="!subject.edit && editable" @click="toggleEdit" size="sm">📝</b-button>
                <span v-if="!subject.edit">{{ subject.name }}</span>
            </p>
        </b-col>
        <b-col>
            <b-form-input v-if="subject.edit" type="text" placeholder="Lesson" v-model="subject.monday"></b-form-input>
            <p v-if="!subject.edit">{{ subject.monday}}</p>
        </b-col>
        <b-col>
            <b-form-input v-if="subject.edit" type="text" placeholder="Lesson" v-model="subject.tuesday"></b-form-input>
            <p v-if="!subject.edit">{{ subject.tuesday}}</p>
        </b-col>
        <b-col>
            <b-form-input v-if="subject.edit" type="text" placeholder="Lesson" v-model="subject.wednesday"></b-form-input>
            <p v-if="!subject.edit">{{ subject.wednesday}}</p>
        </b-col>
        <b-col>
            <b-form-input v-if="subject.edit" type="text" placeholder="Lesson" v-model="subject.thursday"></b-form-input>
            <p v-if="!subject.edit">{{ subject.thursday}}</p>
        </b-col>
        <b-col>
            <b-form-input v-if="subject.edit" type="text" placeholder="Lesson" v-model="subject.friday"></b-form-input>
            <p v-if="!subject.edit">{{ subject.friday}}</p>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'LearningPlanSubject',
    props: {
        editable: true,
        subject: {
            name: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            edit: true
        }
    },
    data() {
        return {
            subjectVal: this.value
        };
    },
    methods: {
        toggleEdit() {
            this.subject.edit = !this.subject.edit;
        }
    },
    watch: {
        subjectVal(val) {
            this.$emit('input', val);
        }
    }
};
</script>

<style scoped>
.save-btn {
    top: -20px;
}
</style>
