<template>
    <div class="home" v-if="this.posts.data">
        <div v-if="!is_createMode"> 
            <button class="button is-light is-primary" v-on:click="ToCreateMode">Create a new TodoList</button>
        </div>
        <br>
        <div v-if="is_createMode"> 
            <div class="field container" >
                    <div class="columns">
                        <div class="column">
                            <div class="control">
                                <input class="input" type="text" placeholder="TodoList Name" v-model="newName">
                            </div>
                        </div>

                        <div class="column">
                            <div class="control">
                                <input class="input" type="text" placeholder="TodoList Created date" v-model="newDate">
                            </div>
                        </div>
                        <div class="column">
                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link is-primary" type="submit" v-on:click="createList">Submit</button>
                                </div>
                                <div class="control">
                                    <button class="button is-link is-light is-primary" type="reset" v-on:click="reset">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        
        <div v-for="list in this.posts.data" v-bind:key="list.id+list.name">
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
                errors: [],
                is_createMode : false,
                newName: '',
                newDate:''
        }
    },

    // Fetches posts when the component is created.
    async created() {
        await axios.get(`http://0.0.0.0:5000/api/lists`)
                        .then(response => (this.posts = response.data))
                        .catch(error => this.errors.push(error))
    },
    methods : {
        async createList() {
            await axios.put(`http://0.0.0.0:5000/api/lists`,
                {
                    name : this.newName,
                    created_on:this.newDate
                }).catch(error => this.errors.push(error))
            this.is_createMode = false
            await axios.get(`http://0.0.0.0:5000/api/lists`)
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
