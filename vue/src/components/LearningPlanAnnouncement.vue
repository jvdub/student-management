<template>
    <b-row>
        <b-col>
            <b-form-textarea
                    v-if="$store.state.user.role.id === 1"
                    v-bind:id="`announcement-${idNumber}`"
                    v-model="subjectVal"
                    placeholder="Enter the announcement">
            </b-form-textarea>
            <p v-if="$store.state.user.role.id !== 1" v-bind:id="`announcement-${idNumber}-readonly`">{{subjectVal}}</p>
        </b-col>
    </b-row>
</template>

<script>
import { debounce } from '../debounce.js';

async function saveAnnouncement(val) {
    console.log('Savin\' it!');
    console.log(val);
}

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
    created() {
        this.debounceAnnouncementSaving = debounce((val) => saveAnnouncement(val), 1000);
    },
    watch: {
        subjectVal(val) {
            this.$emit('input', val);
            this.debounceAnnouncementSaving(val);
        }
    }
};
</script>

<style scoped>

</style>
