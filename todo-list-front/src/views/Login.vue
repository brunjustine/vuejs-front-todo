<template>
    <div class="login container">
        <div class="field">
            <label class="label">Login</label>
            <div class="has-icons-left" >
                <input class="input" type="text" placeholder="Your login" v-model="login">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">password</label>
            <div class="control">
                <input class="input" type="password" placeholder="Your password" v-model="pwd">
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" v-on:click="toLogin">Submit</button>
            </div>
            <div class="control">
                <button class="button is-link is-light">Cancel</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
//import bcrypt from 'bcryptjs'

export default {
    name: 'Login',
    components: {
    },
    data() {
        return {
                login : '',
                pwd : '',
                errors: [],
                hash:''
        }
    },
    methods : {
        toLogin : function () {
            try {
                axios.post(`http://0.0.0.0:5000/api/login`,
                {
                    login : this.login,
                    hash: this.pwd
                }).then(function( response ){
                    localStorage.setItem('token', response.data.data)
                }.bind(this));
            } catch (e) {
                this.errors.push(e)
            }
        }
       
    }
}
</script>