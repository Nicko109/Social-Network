<template>
    <div class="w-96 mx-auto">
        <div class="mb-4">
            <div>
                <input v-model="title" class="w-96  rounded-3xl p-2 border border-slate-300 mb-3" type="text"
                       placeholder="title">
            </div>
            <div>
            <textarea v-model="content" class="w-96  rounded-3xl p-2 border border-slate-300 mb-3"
                      placeholder="content"></textarea>
            </div>
            <div class="flex mb-3 items-center">
                <div>
                    <input @change="storeImage" ref="file" type="file" class="hidden">
                    <a href="#" class="block text-center text-sm w-16 p-2 bg-sky-500 rounded-3xl text-white
            hover:bg-white hover:border hover:border-sky-600 hover:text-sky-600 box-border"
                       @click.prevent="selectFile()">Image</a>
                </div>
                <div>
                    <a @click.prevent="image = null" class="ml-3" href="#">Cancel</a>
                </div>
            </div>
            <div v-if="image">
                <img :src="image.url" alt="preview">
            </div>
            <div>
                <a @click.prevent="store" href="#" class="block text-center w-32 p-2 bg-green-500 rounded-3xl text-white
            hover:bg-white hover:border hover:border-green-600 hover:text-green-600 box-border ml-auto">Publish</a>
            </div>
        </div>
        <div v-if="posts">
            <h1 class="mb-8 pb-8 border-b border-gray-400">Posts</h1>
            <Post v-for="post in posts" :post="post"></Post>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import Post from "../../Post/Post.vue";

export default {
    name: "Personal",

    data() {
        return {
            title: '',
            content: '',
            image: null,
            posts: [],
        }
    },

    components: {
        Post
    },

    mounted() {
        this.getPosts()
    },

    methods: {

        getPosts() {
            axios.get('/api/posts')
                .then(res => {
                    this.posts = res.data.data
                })
        },

        store() {
            const id = this.image ? this.image.id : null
            axios.post('/api/posts', {title: this.title, content: this.content, image_id: id})
                .then(res => {
                    this.title = ''
                    this.content = ''
                    this.image = null
                    this.posts.unshift(res.data.data)
                })
        },

        selectFile() {
            this.fileInput = this.$refs.file;
            this.fileInput.click();
        },
        storeImage(e) {
            const file = e.target.files[0]
            const formData = new FormData()
            formData.append('image', file)

            axios.post('/api/post_images', formData)
                .then(res => {
                    this.image = res.data.data
                })


        }
    }
}
</script>

<style scoped>

</style>
