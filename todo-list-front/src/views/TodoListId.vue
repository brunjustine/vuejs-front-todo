<template>
    <div class="todoListId">
        <div v-if="!is_createMode"> 
                <button class="button is-light is-primary" v-on:click="ToCreateMode">Create a new Todo item</button>
            </div>
            <br>
            <div v-if="is_createMode"> 
                <div class="field container" >
                    <div class="columns">
                        <div class="column">
                            <div class="control">
                                <input class="input" type="text" placeholder="Todo item Name" v-model="newName">
                            </div>
                        </div>
                        <div class="column">
                            <div class="control">
                                <input class="input" type="text" placeholder="Todo item Created date" v-model="newDate">
                            </div>
                        </div>
                        <div class="column">
                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link is-primary" type="submit" v-on:click="createItem">Submit</button>
                                </div>
                                <div class="control">
                                    <button class="button is-link is-light is-primary" type="reset" v-on:click="reset">Cancel</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="this.posts.data">
            <TodoList v-bind:Vlist="this.posts.data"/>
            <br>
            <div v-for="todo in this.posts.data.todos" v-bind:key="todo.id+todo.task.name">
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
            errors: [],
            is_createMode : false,
            newName: '',
            newDate:''
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
    },
    methods : {
        async createItem () {
            await axios.put(`http://0.0.0.0:5000/api/lists/todos/${this.$route.params.todo_list_id}`,
                {
                    name : this.newName,
                    created_on:this.newDate
                }).catch(error => this.errors.push(error))
            this.is_createMode = false
            await axios.get(`http://0.0.0.0:5000/api/lists/${this.$route.params.todo_list_id}`)
                        .then(response => (this.posts = response.data))
                        .catch(error => this.errors.push(error))
        },
        ToCreateMode : function () {
            this.is_createMode=true
        },
        reset : function () {
            this.is_createMode=false
        }
    }
}
</script>