<template>
    <div class="signup container">
        <div class="field">
            <label class="label">Login</label>
            <div class="control has-icons-left has-icons-right" >
                <input class="input is-success" type="text" placeholder="Choose your login" v-model="login">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </div>
            <p class="help is-success">This login is available</p>
        </div>

        <div class="field">
            <label class="label">password</label>
            <div class="control">
                <input class="input" type="password" placeholder="Choose your password" v-model="pwd">
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" v-on:click="createUser">Create</button>
            </div>
            <div class="control">
                <button class="button is-link is-light">Cancel</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import bcrypt from 'bcryptjs'

export default {
    name: 'SignUp',
    components: {
    },
    data() {
        return {
                login : '',
                pwd : '',
                errors: []
        }
    },
    methods : {
        hashPwd : function (pwd) {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(pwd, salt);
            console.log(hash)
            console.log(salt)
            return hash
        },
        createUser : function () {
            try {
                axios.post(`http://0.0.0.0:5000/api/account`,
                {
                    login : this.login,
                    password: this.hashPwd(this.pwd)
                }).then(function( response ){
                    console.log(response.data.data)
                    this.posts = response.data.data
                }.bind(this));
            } catch (e) {
                this.errors.push(e)
            }
        }
       
    }
}
</script>