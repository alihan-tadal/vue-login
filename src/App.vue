<script>
import axios from 'axios'

export default {
  name: "app",  
  data() {
    return {
      showMobileMenu: false,
    }
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  },
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="showMobileMenu = !showMobileMenu" data-target="navbar-menu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" id="navbar-menu" :class="{'is-active': showMobileMenu}">
      <!-- <div class="navbar-start">
          <router-link to="/about" class="navbar-item">Hakkında</router-link>
      </div> -->

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="$store.state.isAuthenticated">
              <router-link to="/account" class="button is-primary dropdown">Hesabım</router-link>
            </template>
            <template v-else>
              <router-link to="/signup" class="button is-primary"><strong>Sign up</strong></router-link>
              <router-link to="/login" class="button is-light"><strong>Log in</strong></router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <router-view></router-view>
</template>

<style>

</style>
