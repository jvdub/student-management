<template>
    <b-row>
        <b-col>
            <b-form-textarea
                    v-if="$store.state.user.role.id === 1"
                    v-bind:id="`announcement-${idNumber}`"
                    v-model="subjectVal"
                    placeholder="Enter the announcement"
                    @keyup="debounceAnnouncementSaving"></b-form-textarea>
            <p v-if="$store.state.user.role.id !== 1" v-bind:id="`announcement-${idNumber}-readonly`">{{subjectVal}}</p>
        </b-col>
    </b-row>
</template>

<script>
import { debounce } from '../debounce.js';

export default {
    name: 'LearningPlanAnnouncement',
    props: {
        idNumber: 0
    },
    data() {
        return {
            subjectVal: this.value
        };
    },
    watch: {
        subjectVal(val) {
            this.$emit('input', val);
        }
    },
    methods: {
        debounceAnnouncementSaving: debounce.call(this, (e) => this.saveAnnouncement(e), 1000),
        async saveAnnouncement(e) {
            updateCurrentPlan.call(this, this.plan);
        }
    }
};
</script>

<style scoped>

</style>
