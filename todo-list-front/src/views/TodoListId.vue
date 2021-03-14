<template>
    <div class="todoListId">
        <p>This is home</p>
        <div v-if="this.posts.data">
            <TodoList v-bind:Vlist="this.posts.data"/>
            <br>
            <div v-for="todo in this.posts.data.todos" v-bind:key="todo.id">
                <Todo v-bind:VTodo="todo"/>
                <br>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import TodoList from '@/components/TodoList.vue'
import Todo from '@/components/Todo.vue'

export default {
    name: 'TodoListId',
    components: {
        TodoList,
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
            const response = await axios.get(`http://0.0.0.0:5000/api/lists/${this.$route.params.todo_list_id}`)
            this.posts = response.data
        } catch (e) {
            this.errors.push(e)
        }
    }
}
</script>