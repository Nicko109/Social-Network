<template>
    <div class="w-96 mx-auto">
       <div v-if="users">

           <div class="mb-6 pb-6 border-b border-gray-400" v-for="user in users">
               <p>{{ user.id}}</p>
               <p>{{ user.name}}</p>
               <p>{{ user.email}}</p>

           </div>
       </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Index",

    data() {
        return {
            users: []
        }
    },

    mounted() {
        this.getUsers()
    },

    methods: {
        getUsers() {
            axios.get('/api/users/')
            .then(res => {
                this.users = res.data.data
            })
        }
    }
}
</script>

<style scoped>

</style>
