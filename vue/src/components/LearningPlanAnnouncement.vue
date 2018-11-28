<template>
    <b-row>
        <b-col>
            <span v-if="$store.state.user.role.id === 1">
                <b-form-textarea
                        v-bind:id="`announcement-${announcement.id}`"
                        v-model="announcement.announcement"
                        placeholder="Enter the announcement">
                </b-form-textarea>
                <b-button size="sm" @click="removeAnnouncement">❌</b-button>
            </span>
            <span v-if="$store.state.user.role.id !== 1">
                <p v-bind:id="`announcement-${announcement.id}-readonly`">{{announcement.announcement}}</p>
            </span>
        </b-col>
    </b-row>
</template>

<script>
import { debounce } from '../debounce.js';
import { execute } from '../http.js';

async function saveAnnouncement(courseId, sectionId, learningPlanId, text) {
    let announcement = {
        text: text
    };

    execute('post', `/api/course/${courseId}/sections/${sectionId}/learning-plan/${learningPlanId}/announcements`, announcement);
}

async function updateAnnouncement(courseId, sectionId, learningPlanId, id, announcement) {
    let announcementInfo = {
        id: id,
        announcement: announcement
    };

    execute('put', `/api/course/${courseId}/sections/${sectionId}/learning-plan/${learningPlanId}/announcements/${id}`, announcementInfo);
}

async function deleteAnnouncement(courseId, sectionId, learningPlanId, id) {
    execute('delete', `/api/course/${courseId}/sections/${sectionId}/learning-plan/${learningPlanId}/announcements/${id}`);
}

export default {
    name: 'LearningPlanAnnouncement',
    props: {
        announcement: {
            id: null,
            learningPlanId: null,
            announcement: '',
            isNew: true
        }
    },
    data() {
        return {
            announcementVal: this.value,
            courseId: this.$route.params.courseId,
            sectionId: this.$route.params.sectionId,
            learningPlanId: this.$route.params.learningPlanId
        };
    },
    created() {
        this.debounceAnnouncementSaving = debounce((val) => {
            if (this.announcement.isNew) {
                saveAnnouncement(this.courseId, this.sectionId, this.learningPlanId, val);
            } else {
                updateAnnouncement(this.courseId, this.sectionId, this.learningPlanId, this.announcement.id, val);
            }
        }, 1000);
    },
    methods: {
        removeAnnouncement() {
            deleteAnnouncement(this.announcement.id);
            this.$emit('delete', this.announcement.id);
        }
    },
    watch: {
        announcementVal(val) {
            this.debounceAnnouncementSaving(val);
            this.$emit('input', val);
        }
    }
};
</script>

<style scoped>

</style>
