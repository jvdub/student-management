<template>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="password" :id="identifier" :name="name">
        <label class="mdl-textfield__label" :for="identifier">{{labelText}}</label>
    </div>
</template>

<script>
export default {
    name: 'PasswordField',
    props: {
        identifier: String,
        name: String,
        labelText: String
    }
};
</script>

<style scoped>

</style>
