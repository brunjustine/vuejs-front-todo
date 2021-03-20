<template>
    <div class="todoId">
        <div v-if="this.posts.data">
            <div v-if="this.posts.data.task">
                <Todo v-bind:VTodo="this.posts.data"/>
                <br>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import Todo from '@/components/Todo.vue'

export default {
    name: 'TodoId',
    components: {
        Todo
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
            const response = await axios.get(`http://0.0.0.0:5000/api/lists/todos/${this.$route.params.todo_list_id}/${this.$route.params.todo_id}`)
            this.posts = response.data
        } catch (e) {
            this.errors.push(e)
            this.$router.replace('/login')
        }
    }
}
</script>