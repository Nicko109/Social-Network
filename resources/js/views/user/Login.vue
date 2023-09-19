<template>
    <div class="w-96 mx-auto">
        <div>
            <input v-model="email" type="email" class="w-96 p-1 mb-2 border border-inherit rounded-lg" placeholder="email">
        </div>
        <div>
            <input v-model="password" type="password" class="w-96 p-1 mb-2 border border-inherit rounded-lg" placeholder="password">
        </div>
        <button @click.prevent="login" class="block float-right mx-auto w-32 p-1 border bg-sky-400 text-white rounded-lg">login</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Login",

    data() {
        return {
            email: null,
            password: null,
        }
    },

    methods: {
        login() {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/login', {email: this.email, password: this.password})
                    .then(res => {
                        localStorage.setItem('x_xsrf_token', res.config.headers['X-XSRF-TOKEN'])
                        this.$router.push({name: 'user.personal'})
                    })
                    .catch(err => {

                    })
            })
        }
    }
}
</script>

<style scoped>

</style>
