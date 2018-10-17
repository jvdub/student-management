<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <p>Student Management</p>
        <p v-if="this.$store.state.authenticated">You done it, {{`${this.$store.state.user.person.firstName} ${this.$store.state.user.person.lastName}`}}!</p>
        <p v-if="this.$store.state.authenticated">You are a {{user.role.name}}.</p>
    </div>
</template>

<script>
export default {
    name: 'home'
};
</script>
