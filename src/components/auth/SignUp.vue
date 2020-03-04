<template>
  <section class="section">
    <div class="container">

      <notification :message="message"></notification>

      <div class="columns">
        <div class="
          column
          is-8-tablet
          is-offset-2-tablet
          is-6-desktop
          is-offset-3-desktop">

          <h3 class="title has-text-centered">Try <b>Write</b>Flow free for 30 days</h3>
          <h5 class="title is-5 has-text-centered has-text-primary">No credit card required</h5>

          <article class="message">
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
                      I agree to the <router-link to="/terms-of-service" target="_blank">Terms of Service</router-link>.
                    </label>
                  </div>
                </div>

                <br>

                <div class="field">
                  <div class="control">
                    <button class="button is-fullwidth is-primary is-medium" id="buttonSignUp" @click="signUp">Try it Out, Free!</button>
                  </div>
                </div>

                <p class="has-text-centered">Didn't get your email confirmation? <router-link to="/auth/resend-confirmation">Resend Confirmation</router-link></p>
              </div>

            </form>
          </article>

        </div><!-- /column -->
      </div><!-- /columns -->

      <div class="columns">

        <div class="column is-6 is-offset-3 has-text-centered">
          <p>Already have an account? <router-link to="/auth/sign-in">Sign In</router-link></p>
        </div>

      </div><!-- /columns -->

    </div>
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
                  type: 'is-success',
                  text: 'Check your email to complete the sign-up.'
                }

                document.getElementById('buttonSignUp').removeClass('is-loading')
                window.scrollTo(0, 0)
              })
              .catch((error) => {
                if (error.error === 'name already in use') {
                  this.message = {
                    type: 'is-danger',
                    text: email + ' has already been registered in the system. <a href="/auth/resend-confirmation">Click here</a> to request another email confirmation.'
                  }
                } else {
                  this.message = {
                    type: 'is-danger',
                    text: error.error
                  }
                }

                document.getElementById('buttonSignUp').removeClass('is-loading')
                window.scrollTo(0, 0)
              })
          } else {
            this.message = {
              type: 'is-danger',
              text: 'All fields are required.'
            }

            window.scrollTo(0, 0)
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
