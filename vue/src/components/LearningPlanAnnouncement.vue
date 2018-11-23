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

async function savePlan() {

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
    watch: {
        subjectVal(val) {
            this.$emit('input', val);
        }
    }
};
</script>

<style scoped>

</style>
