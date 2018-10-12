<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <p>Student Management</p>
        <p v-if="this.$store.state.authenticated">You done it!</p>
    </div>
</template>

<script>
export default {
    name: 'home'
};
</script>
