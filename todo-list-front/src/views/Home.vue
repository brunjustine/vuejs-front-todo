<template>
    <div class="home">
        <p>This is home</p>
        <div v-for="list in this.posts.data" v-bind:key="list.id">
            <TodoList v-bind:Vlist="list"/>
            <br>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import TodoList from '@/components/TodoList.vue'

export default {
    name: 'Home',
    components: {
        TodoList
    },
    data() {
        return {
        posts: [],
        errors: []
        }
    },

    // Fetches posts when the component is created.
    async created() {
        try {
        const response = await axios.get(`http://0.0.0.0:5000/api/lists`)
        this.posts = response.data
        } catch (e) {
        this.errors.push(e)
        }
    }
}
</script>
