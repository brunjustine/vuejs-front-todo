<template>
    <div class="todo container">
        <div class="box" v-if="VTodo">
            <div class="columns">
                <div class="column">
                    <h1 class="subtitle">
                        {{VTodo.task.name}}
                    </h1>
                </div>
                <div class="column">
                    <span class="tag date">
                        {{VTodo.task.created_on}}
                    </span> 
                </div>
            </div>
            <div class="columns">
              <div class="column">
                <p v-if="VTodo.task.description">{{VTodo.task.description}}</p>
              </div>
            </div>
            <div class="columns" v-if="is_editable">
                <div class="column">
                    <button class="button is-light is-info" v-on:click="select">View</button>
                </div>
                <div class="column">
                    <button class="button is-light is-warning" v-on:click="update">Update</button>
                </div>
                <div class="column">
                    <button class="button is-light is-danger" v-on:click="deleteList">Delete</button>
                </div>
            </div>          
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'Todo',
  props: {
    VTodo: Object,
  },
  data: function() {
    return {
          is_editable: !this.$route.params.todo_id,
    }
  },
  methods: {
    async select () {
      this.$router.push({ path: `/${this.$route.params.todo_list_id}/${this.VTodo.id}`})  
    },
    update : function () {
        alert('update ' + this.Vlist.name + '!')
    },
    async deleteList () {
        try {
            const response = await axios.delete(`http://0.0.0.0:5000/api/lists/todos/${this.$route.params.todo_list_id}/${this.VTodo.id}`)
            this.posts = response.data
        } catch (e) {
            this.errors.push(e)
        }
    }
  }
}
</script>

<style>
    .todo {
        text-align: left;
    }
    .date {
        text-align: right;
    }
</style>