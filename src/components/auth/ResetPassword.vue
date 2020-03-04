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
          is-offset-3-desktop">

          <article class="message">
            <form class="message-body" v-on:submit.prevent>
              <h1 class="title has-text-centered">Change Password</h1>

              <!-- Auth enabled -->
              <div v-if="$store.state.allowAuth">
                <div class="field">
                  <input class="input is-large" id="password" type="password" placeholder="Password">
                  <ul class="help">
                    <li>Minimum 8 characters required</li>
                  </ul>
                </div>

                <div class="field">
                  <button class="button is-fullwidth is-primary is-large" id="action-button" @click="resetPassword">Set New Password</button>
                </div>
              </div>

              <!-- Auth disabled -->
              <div v-else>
                <div class="field">
                  <input class="input is-large" type="email" placeholder="Email Address" disabled>
                </div>

                <div class="field">
                  <button class="button is-fullwidth is-primary is-large" disabled>Reset Password</button>
                </div>
              </div>
            </form>
          </article>

        </div><!-- /column -->
      </div><!-- /columns -->

      <div class="columns">

        <div class="column is-6 is-offset-3 has-text-centered">
          Go back to <router-link to="/auth/sign-in">Sign In</router-link>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
  import Notification from '@/components/app/Notification'

  export default {
    components: {
      Notification
    },
    beforeCreate () {
      var token = this.$route.query.token
      var tokenId = this.$route.query.tokenId

      if (!token || !tokenId || token.length !== 128 || tokenId.length !== 24) {
        this.$router.replace('/401')
      }
    },
    data: function () {
      return {
        message: {}
      }
    },
    methods: {
      setNotification (message) {
        this.message = message
      },
      resetPassword (event) {
        if (this.$store.state.allowAuth) {
          // var router = this.$router
          var setNotification = this.setNotification

          // Reset any notifications
          setNotification({})

          var token = this.$route.query.token
          var tokenId = this.$route.query.tokenId
          var password = document.getElementById('password').value
          var actionButton = document.getElementById('action-button')

          actionButton.addClass('is-loading')

          this.$store.state.stitchClient.auth.provider('userpass').passwordReset(tokenId, token, password)
            .then(() => {
              this.$router.replace('/auth/sign-in?action=passwordReset')
            })
            .catch(error => {
              setNotification({
                type: 'is-danger',
                text: error.error
              })

              actionButton.removeClass('is-loading')
            })
        }
      }
    }
  }
</script>
