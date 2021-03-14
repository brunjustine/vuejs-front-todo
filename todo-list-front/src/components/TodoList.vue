<template>
    <div class="list container">
        <div class="box" v-if="Vlist">
            <div class="columns">
                <div class="column">
                    <h1 class="subtitle">
                        {{Vlist.name}}
                    </h1>
                </div>
                <div class="column">
                    <span class="tag date">
                        {{Vlist.created_on}}
                    </span> 
                </div>
            </div>
            <div class="columns">
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
//const router = this.$route

export default {
  name: 'TodoList',
  props: {
    Vlist:Object,
  },

  methods: {
    async select () {
      this.$router.push({ path: `/${this.Vlist.id}`})  
    },
    update : function () {
        alert('update ' + this.Vlist.name + '!')
    },
    deleteList : function () {
        try {
            const response = axios.delete(`http://0.0.0.0:5000/api/lists/${this.Vlist.id}`)
            this.posts = response.data
        } catch (e) {
            this.errors.push(e)
        }
    }
  }
}
</script>