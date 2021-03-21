<template>
    <div class="list container">
        <div class="box" v-if="todoList">
            <div v-if="!is_updateMode">
                <div class="columns">
                    <div class="column">
                        <h1 class="subtitle" >
                            {{todoList.name}}
                        </h1>
                    </div>
                    <div class="column">
                        <span class="tag date">
                            {{todoList.created_on}}
                        </span> 
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
                        <button class="button is-light is-danger" v-on:click="deleteList">Delete</button>
                    </div>
                </div>
            </div>
            <div v-if="is_updateMode">
                <div class="field" >
                    <div class="columns">
                        <div class="column">
                            <div class="control">
                                <input class="input" type="text" placeholder="TodoList Name" v-model="updatedName">
                            </div>
                        </div>

                        <div class="column">
                            <div class="control">
                                <input class="input" type="text" placeholder="TodoList Created date" v-model="updatedDate">
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
//const router = this.$route

export default {
  name: 'TodoList',
  props: {
    Vlist:Object,
  },
  data: function() {
    return {
          is_editable: !this.$route.params.todo_list_id,
          is_updateMode : false,
          updatedName : this.Vlist.name,
          updatedDate : this.Vlist.created_on,
          todoList : this.Vlist
    }
},

  methods: {
    async select () {
      this.$router.push({ path: `/${this.todoList.id}`})  
    },
    update : function () {
        try {
            axios.patch(`http://0.0.0.0:5000/api/lists/${this.todoList.id}`,
            {
                name : this.updatedName,
                created_on:this.updatedDate
            }).then(function( response ){
                    this.todoList = response.data.data         
            }.bind(this));
            
            this.is_updateMode = false
        } catch (e) {
            this.errors.push(e)
        }
    },
    deleteList : function () {
        try {
            const response = axios.delete(`http://0.0.0.0:5000/api/lists/${this.todoList.id}`)
            this.todoList  = response.data
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