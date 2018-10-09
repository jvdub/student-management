<template>
    <div class="login">
        <form>
            <TextField identifier="username" name="username" labelText="Username: "></TextField>
            <br/>
            <PasswordField identifier="password" name="password" labelText="Password: "></PasswordField>
            <br/>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" id="log-in" name="log-in">Log In</button>
        </form>
    </div>
</template>

<script>
import TextField from '@/components/TextField';
import PasswordField from '@/components/PasswordField';

export default {
    name: 'Login',
    components: {
        PasswordField,
        TextField
    }
};
</script>

<style scoped>

</style>