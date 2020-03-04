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
              <h1 class="title has-text-centered">Resend Email Confirmation</h1>
              <h1 class="subtitle has-text-centered">Enter the email address you used to create an account with.</h1>

              <!-- Auth enabled -->
              <div v-if="$store.state.allowAuth">
                <div class="field">
                  <input class="input is-large" id="email" type="email" placeholder="Email address" v-bind:value="email">
                </div>

                <div class="field">
                  <button class="button is-fullwidth is-primary is-large" id="action-button" @click="action">Resend Confirmation</button>
                </div>
              </div>

              <!-- Auth disabled -->
              <div v-else>
                <div class="field">
                  <input class="input is-large" type="email" placeholder="Email Address" disabled>
                </div>

                <div class="field">
                  <button class="button is-fullwidth is-primary is-large" disabled>Resend Confirmation</button>
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
  import stitchClient from '@/mongoDBServices'
  import Notification from '@/components/app/Notification'

  export default {
    components: {
      Notification
    },
    created () {
      this.email = this.$router.currentRoute.query.email
    },
    data () {
      return {
        email: '',
        message: {}
      }
    },
    methods: {
      action (event) {
        if (this.$store.state.allowAuth) {
          // Reset any notifications
          this.message = {}

          var email = document.getElementById('email')
          var actionButton = document.getElementById('action-button')

          actionButton.addClass('is-loading')

          stitchClient.auth.provider('userpass').sendEmailConfirm(email.value)
            .then(result => {
              this.message = {
                type: 'is-success',
                text: 'Please check your email to confirm your account.'
              }

              actionButton.removeClass('is-loading')
            })
            .catch(error => {
              if (error.error === 'already confirmed') {
                this.message = {
                  type: 'is-danger',
                  text: 'This email address has already been confirmed. <a href="/auth/forgot-password">Click here</a> if you have forgotten your password.'
                }
              } else {
                this.message = {
                  type: 'is-danger',
                  text: error.error
                }
              }

              actionButton.removeClass('is-loading')
            })
        }
      }
    }
  }
</script>
