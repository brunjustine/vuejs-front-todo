<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          
          <div class="buttons" v-if="!user">
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
                user: localStorage.getItem('user_login')
        }
    },
    methods: {
      deconnexion : function() {
        this.user = undefined
        localStorage.clear()
        this.$router.replace('/login').catch(()=>{});
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
</style>
