<template>
    <div class="signup container">
        <div class="field">
            <label class="label">Login</label>
            <div class="control has-icons-left has-icons-right" >
                <input class="input" type="text" placeholder="Choose your login" v-model="login">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </div>
            <p class="help is-danger" v-if="is_duplicate">Login already exists</p>
        </div>
        
        <div class="field">
            <label class="label">password</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-danger" type="password" placeholder="Choose your password" v-model="pwd">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <div class="control has-icons-left has-icons-right">
                <input class="input is-danger" type="password" placeholder="Choose your password" v-model="pwd_check">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>  
        </div>
        <p class="help is-danger" v-if="!is_equals">Passwords not equals</p>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" v-on:click="createUser" v-bind:disabled="!is_equals">Create</button>
            </div>
            <div class="control">
                <button class="button is-link is-light" v-on:click="reset">Cancel</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
//import bcrypt from 'bcryptjs'

export default {
    name: 'SignUp',
    components: {
    },
    data() {
        return {
                login : '',
                is_duplicate : false,
                pwd : '',
                pwd_check : '',
                errors: [],
                is_equals : false
        }
    },
    methods : {
        async createUser() {
            this.checkLogin()
            if (!this.is_duplicate) {
                try {
                    await axios.post(`http://0.0.0.0:5000/api/account`,
                    {
                        login : this.login,
                        password:this.pwd
                    }).then(function( response ){
                        console.log(response.data.data)
                        if (response.data.data) {
                            this.posts = response.data.data
                            alert("Account create, please go to login to access to the full application")
                            this.$router.replace('/login').catch(()=>{});
                        }
                        
                    }.bind(this));
                } catch (e) {
                    alert("Error : "+e)
                    this.errors.push(e)
                }
            }
        },
        reset : function () {
            this.pwd =''
            this.pwd_check =''
            this.login =''
        },
        checkLogin: function () {
            this.is_duplicate = false
            axios.get(`http://0.0.0.0:5000/api/account`)
                .then(response => {
                    response.data.data.forEach(user => {
                        if (user['login']==this.login) {
                            return this.is_duplicate = true
                        }
                    })
                })
                .catch(error => {this.errors.push(error)})
            console.log("duplicate : "+this.is_duplicate)
        },
        checkPwd : function () {
            return this.pwd != ''
        }
    },
    watch: {
        pwd: function (val) {
            this.is_equals = val == this.pwd_check
            if (val == '') {
                this.is_equals = false
            }
        },
        pwd_check: function (val) {
            this.is_equals = this.pwd == val
            if (val == '') {
                this.is_equals = false
            }
        }
    }
}
</script>