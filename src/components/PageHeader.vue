<template>
  <div class="container">
    <nav class="navbar">

      <div class="navbar-brand">
        <router-link class="navbar-item" to="/" exact>
          <p class="title is-4"><b>Write</b>Flow</p>
        </router-link>

        <div class="navbar-burger" id="navbar-burger" v-on:click="toggleNavMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" id="navbar-menu">
        <div class="navbar-end">

          <!-- general buttons -->
          <!--
          <router-link class="navbar-item" to="/examples">Examples</router-link>
        -->
          <router-link class="navbar-item" to="/guide">Guide</router-link>
          <router-link class="navbar-item" to="/frequently-asked-questions">FAQ</router-link>
          <router-link class="navbar-item" to="/pricing">Pricing</router-link>
          <router-link class="navbar-item" to="/about">About</router-link>

          <!-- my documents button -->
          <div class="navbar-item" v-if="$store.state.userName">
            <router-link to="/app/my-documents">My Documents</router-link>
          </div>

          <!-- user dropdown -->
          <div class="navbar-item has-dropdown is-hoverable" v-if="$store.state.userName">
            <div class="navbar-item">
              <span class="icon"><i class="fa fa-user-circle"></i></span>
              {{ $store.state.userName }}
              <span class="icon"><i class="fa fa-caret-down"></i></span>
            </div>

            <div class="navbar-dropdown is-boxed is-right">

              <router-link class="navbar-item" to="/my-account">My Account</router-link>

              <hr class="navbar-divider">

              <div class="navbar-item">
                  <a class="button is-danger is-outline" @click="signOut()">Sign-out</a>
              </div>

            </div>
          </div>

          <!-- sign-in button -->
          <div class="navbar-item" v-if="$store.state.allowAuth && ! $store.state.userName">
            <router-link class="" to="/auth/sign-in">Sign In</router-link>
          </div>
          <div class="navbar-item" v-if="! $store.state.allowAuth && ! $store.state.userName">
            <button class="button is-text" disabled>Sign In</button>
          </div>

          <!-- sign-up button -->
          <div class="navbar-item" v-if="$store.state.allowAuth && ! $store.state.userName">
            <router-link class="button is-primary" to="/auth/sign-up">Sign Up</router-link>
          </div>

          <div class="navbar-item" v-if="! $store.state.allowAuth && ! $store.state.userName">
            <button class="button is-primary" disabled>Sign Up</button>
          </div>

        </div>
      </div>

    </nav>
  </div><!-- /container -->

</template>

<script>
  import stitchClient from '@/mongoDBServices'

  export default {
    methods: {
      signOut: function () {
        var router = this.$router
        var store = this.$store

        stitchClient.logout()
          .then(() => {
            store.commit('setUserName', null)

            router.push('/auth/signed-out')
          })
          .catch(error => {
            console.log('Sign-out error')
            console.log(JSON.stringify(error))
          })
      },
      toggleNavMenu: function () {
        var navButton = document.getElementById('navbar-burger')
        if (navButton.hasClass('is-active')) {
          navButton.removeClass('is-active')
        } else {
          navButton.addClass('is-active')
        }

        var navMenu = document.getElementById('navbar-menu')
        if (navMenu.hasClass('is-active')) {
          navMenu.removeClass('is-active')
        } else {
          navMenu.addClass('is-active')
        }
      }
    }
  }
</script>
