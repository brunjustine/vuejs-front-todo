<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="" >
        <router-link to="/">
          <img src="./assets/shortlist.png">
        </router-link>
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-if="!token">
              <strong><router-link class="button is-primary" to="/signup">Sign up</router-link></strong>
               <router-link class="button is-light" to="/login">Log in</router-link>
          </div>
          <div class="field is-grouped" v-else>
              <div class="control">
                <strong><span class="button is-primary">{{user}}</span></strong>
              </div>
              <div class="control">
                <button class="button is-primary is-light" v-on:click="deconnexion">Deconnexion</button>
             </div>
          </div>

        </div>
      </div>
    </div>
  </nav>
  <router-view/>
  </div>


</template>

<script>

export default {
    name: 'App',
    data() {
        return {
                user: localStorage.getItem('user_login'),
                token : localStorage.getItem('token')
        }
    },
    methods: {
      deconnexion : function() {
        this.user = undefined
        this.token = undefined
        localStorage.clear()
        this.$router.replace('/login').catch(()=>{});
      }
    },
    watch: {
      '$route': function(){
        this.user = localStorage.getItem('user_login')
        this.token = localStorage.getItem('token')
      }
    }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {

  width:15%; /* you can use % */
  height: auto;
}
</style>
