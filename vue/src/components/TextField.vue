<template>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" :id="identifier" :name="name">
        <label class="mdl-textfield__label" :for="identifier">{{labelText}}</label>
    </div>
</template>

<script>
export default {
    name: 'TextField',
    props: {
        identifier: String,
        labelText: String,
        name: String
    }
};
</script>

<style scoped>

</style>
