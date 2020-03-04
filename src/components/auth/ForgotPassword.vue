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
              <h1 class="title">Forgot Password</h1>

              <!-- Auth enabled -->
              <div v-if="$store.state.allowAuth">
                <div class="field">
                  <input class="input is-large" id="email" type="email" placeholder="Email Address">
                </div>

                <div class="field">
                  <button class="button is-fullwidth is-primary is-large" id="action-button" @click="resetPassword">Reset Password</button>
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
          <p>Having problems with your account?</p>
          <p>Please email <a href="mailto:support@getwriteflow.com">support@getwriteflow.com</a> for direct support</p>
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
    data: function () {
      return {
        message: {}
      }
    },
    methods: {
      setNotification: function (message) {
        this.message = message
      },
      resetPassword () {
        if (this.$store.state.allowAuth) {
          var setNotification = this.setNotification

          // Reset any notifications
          setNotification({})

          var email = document.getElementById('email').value
          var actionButton = document.getElementById('action-button')

          if (email.trim()) {
            actionButton.addClass('is-loading')

            this.$store.state.stitchClient.auth.provider('userpass').sendPasswordReset(email)
              .then(() => {
                setNotification({
                  type: 'is-warning',
                  text: 'Please check your email to reset your password.'
                })

                actionButton.removeClass('is-loading')
              })
              .catch(() => {
                setNotification({
                  type: 'is-danger',
                  text: 'Email address not found'
                })

                actionButton.removeClass('is-loading')
              })
          } else {
            setNotification({
              type: 'is-danger',
              text: 'Please enter the email address you used to create your account.'
            })

            actionButton.removeClass('is-loading')
          }
        }
      }
    }
  }
</script>
