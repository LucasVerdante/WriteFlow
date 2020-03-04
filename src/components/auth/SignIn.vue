<template>
  <section class="section is-medium">
    <div class="container">

      <notification :message="message"></notification>

      <div class="columns">
        <div class="
          column
          is-8-tablet
          is-offset-2-tablet
          is-6-desktop
          is-offset-3-desktop
          has-text-centered">

          <article class="message">
            <form class="message-body" v-on:submit.prevent>

              <h1 class="title">Sign In</h1>

              <!-- Auth enabled -->
              <div v-if="$store.state.allowAuth">
                <div class="field">
                  <input class="input is-large" id="email" type="email" placeholder="Email Address">
                </div>

                <div class="field">
                  <input class="input is-large" id="password" type="password" placeholder="Password">
                </div>

                <div class="field">
                  <button class="button is-fullwidth is-primary is-large" id="action-button" @click="signIn()">Sign In</button>
                </div>

                <router-link to="/auth/forgot-password">Forgot Password?</router-link>
              </div>

              <!-- Auth disabled -->
              <div v-else>
                <div class="field">
                  <input class="input is-large" type="email" placeholder="Email Address" disabled>
                </div>

                <div class="field">
                  <input class="input is-large" type="password" placeholder="Password" disabled>
                </div>

                <div class="field">
                  <button class="button is-fullwidth is-primary is-large" disabled>Sign In</button>
                </div>

                <router-link to="/auth/forgot-password">Forgot Password?</router-link>
              </div>

            </form>
          </article>

        </div><!-- /column -->
      </div><!-- /columns -->

      <div class="columns">

        <div class="column is-6 is-offset-3 has-text-centered">
          Don't have an account? <router-link to="/auth/sign-up">Sign Up</router-link>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
  import stitchClient from '@/mongoDBServices'
  import Notification from '@/components/app/Notification'

  export default {
    components: {
      Notification
    },
    created: function () {
      if (this.$router.currentRoute.path === '/auth/signed-out') {
        this.message = {
          type: 'is-info',
          text: 'You are now signed-out of your account.'
        }
      }

      if (this.$route.query.action === 'passwordReset') {
        this.message = {
          type: 'is-success',
          text: 'Your password has been changed.'
        }
      }

      if (this.$route.query.action === 'emailConfirmed') {
        this.message = {
          type: 'is-success',
          text: "Your account is now confirmed. You can sign-in whenever you're ready."
        }
      }
    },

    data: function () {
      return {
        message: {}
      }
    },

    methods: {
      signIn: function () {
        var store = this.$store

        if (store.state.allowAuth) {
          var router = this.$router

          // Reset any notifications
          this.message = {}

          var email = document.getElementById('email').value
          var password = document.getElementById('password').value
          var actionButton = document.getElementById('action-button')

          actionButton.addClass('is-loading')

          stitchClient.login(email, password)
            .then(userId => {
              router.push('/app/my-documents')
            })
            .then(() => {
              stitchClient.userProfile()
                .then(user => {
                  store.commit('setUserName', user.data.email)
                })
                .catch(error => {
                  console.log(JSON.stringify(error))

                  store.commit('setUserName', 'My Account')
                })
            })
            .catch(error => {
              this.message = {
                type: 'is-danger',
                text: error.error
              }

              actionButton.removeClass('is-loading')
            })
        }
      }
    }
  }
</script>
