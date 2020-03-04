<template>
  <section class="hero is-light">
    <div class="hero-body">
      <div class="container">

        <notification :message="message"></notification>

        <div class="columns">
          <div class="column is-4-desktop is-offset-4-desktop">
            <h1 class="title has-text-centered">Sign-up</h1>

            <form class="message-body" v-on:submit.prevent>
              <div id="form">

                <div class="field">
                  <div class="control">
                    <input class="input is-medium" id="email" type="email" placeholder="Email Address">
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input class="input is-medium" id="password" type="password" placeholder="Password">
                  </div>
                  <p class="help">8 characters minimum</p>
                </div>

                <div class="field">
                  <div class="control has-text-centered">
                    <label class="checkbox">
                      <input type="checkbox" id="agree-to-terms">
                      I agree to the <router-link to="/terms-of-service" target="_blank"><u>Terms of Service</u></router-link>.
                    </label>
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <button class="button is-fullwidth is-primary is-medium" id="buttonSignUp" @click="signUp">Try it Out, Free!</button>
                  </div>
                </div>

              </div>

            </form>
          </div><!-- /column -->
        </div><!-- /columns -->
      </div><!-- /container -->
    </div><!-- /hero-body -->
  </section>

</template>

<script>
  import Notification from '@/components/app/Notification'

  export default {
    components: {
      Notification
    },
    data () {
      return {
        message: {}
      }
    },
    methods: {
      signUp () {
        if (this.$store.state.allowAuth) {
          var allValid = true

          // var displayNotification = this.displayNotification
          var stitchClient = this.$store.state.stitchClient

          var email = document.getElementById('email').value
          var password = document.getElementById('password').value

          // Reset form
          document.getElementById('agree-to-terms').parentElement.parentElement.removeClass('has-text-danger')

          // Perform validations
          if (!document.getElementById('agree-to-terms').checked) {
            document.getElementById('agree-to-terms').parentElement.parentElement.addClass('has-text-danger')
            allValid = false
          }

          if (allValid) {
            document.getElementById('buttonSignUp').addClass('is-loading')

            this.message = {}

            stitchClient.register(email, password)
              .then((result) => {
                this.message = {
                  type: 'is-info',
                  text: 'Account created. Check your email to complete the sign-up.'
                }

                document.getElementById('buttonSignUp').removeClass('is-loading')
              })
              .catch((error) => {
                if (error.error === 'name already in use') {
                  this.message = {
                    type: 'is-danger',
                    text: email + ' has already been registered in the system. <a href="/auth/resend-confirmation?email=' + email + '">Click here</a> to request another email confirmation.'
                  }

                  document.getElementById('buttonSignUp').removeClass('is-loading')
                } else {
                  this.message = {
                    type: 'is-danger',
                    text: error.error
                  }

                  document.getElementById('buttonSignUp').removeClass('is-loading')
                }
              })
          } else {
            this.message = {
              type: 'is-danger',
              text: 'All fields are required.'
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  input[type="checkbox"] {
    zoom: 1.75;
    vertical-align: middle;
  }
</style>
