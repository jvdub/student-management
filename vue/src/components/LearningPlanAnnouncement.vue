<template>
    <b-row>
        <b-form-textarea v-if="userRoleId === 1" v-bind:id="`announcement-${idNumber}`" v-model="subjectVal" placeholder="Enter the announcement"></b-form-textarea>
        <p v-if="userRoleId !== 1" v-bind:id="`announcement-${idNumber}-readonly`">{{subjectVal}}</p>
    </b-row>
</template>

<script>
export default {
    name: 'LearningPlanAnnouncement',
    props: {
        idNumber: 0
    },
    data() {
        return {
            userRoleId: this.$store.state.user.role.id,
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
