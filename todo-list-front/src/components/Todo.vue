<template>
    <div class="todo container">
        <div class="box" v-if="todoItem">
            <div  v-if="!is_updateMode">
                <div class="columns">
                    <div class="column">
                        <h1 class="subtitle">
                            {{todoItem.task.name}}
                        </h1>
                    </div>
                    <div class="column">
                        <span class="tag date">
                            {{todoItem.task.created_on}}
                        </span> 
                    </div>
                </div>
                <div class="columns">
                <div class="column">
                    <p v-if="todoItem.task.description">{{todoItem.task.description}}</p>
                </div>
                </div>
                <div class="columns" v-if="is_editable">
                    <div class="column">
                        <button class="button is-light is-info" v-on:click="select">View</button>
                    </div>
                    <div class="column">
                        <button class="button is-light is-warning" v-on:click="toUpdateMode">Update</button>
                    </div>
                    <div class="column">
                        <button class="button is-light is-danger" v-on:click="deleteItem">Delete</button>
                    </div>
                </div> 
            </div>
            <div v-if="is_updateMode">
                <div class="field" >
                    <div class="columns">
                        <div class="column">
                            <div class="control">
                                <input class="input" type="text" placeholder="Todo item Name" v-model="updatedName">
                            </div>
                        </div>

                        <div class="column">
                            <div class="control">
                                <input class="input" type="text" placeholder="Todo item Created date" v-model="updatedDate">
                            </div>
                        </div>
                        <div class="column">
                            <div class="control">
                                <input class="input" type="text" placeholder="Todo item description" v-model="updatedDescription">
                            </div>
                        </div>
                        <div class="column">
                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link is-warning" type="submit" v-on:click="update">Submit</button>
                                </div>
                                <div class="control">
                                    <button class="button is-link is-light is-warning" type="reset" v-on:click="reset">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
          is_updateMode : false,
          updatedName : this.VTodo.task.name,
          updatedDate : this.VTodo.task.created_on,
          updatedDescription : this.VTodo.task.description,
          todoItem : this.VTodo
    }
  },
  methods: {
    async select () {
      this.$router.push({ path: `/${this.$route.params.todo_list_id}/${this.todoItem.id}`})  
    },
    update : function () {
        try {
            axios.patch(`http://0.0.0.0:5000/api/lists/todos/${this.$route.params.todo_list_id}/${this.todoItem.id}`,
            {
                name : this.updatedName,
                created_on:this.updatedDate,
                description : this.updatedDescription
            }).then(function( response ){
                    this.todoItem = response.data.data         
            }.bind(this));
            
            this.is_updateMode = false
        } catch (e) {
            this.errors.push(e)
        }
    },
    deleteItem () {
        try {
            const response = axios.delete(`http://0.0.0.0:5000/api/lists/todos/${this.$route.params.todo_list_id}/${this.todoItem.id}`)
            this.todoItem = response.data
        } catch (e) {
            this.errors.push(e)
        }
    },
    toUpdateMode : function () {
        this.is_updateMode=true
    },
    reset : function () {
        this.is_updateMode=false
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