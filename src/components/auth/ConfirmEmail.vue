<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">Confirm Email</h2>

      <notification :message="message"></notification>
    </div>
  </section>
</template>

<script>
  import stitchClient from '@/mongoDBServices'
  import Notification from '@/components/app/Notification'

  export default {
    beforeCreate () {
      var token = this.$route.query.token
      var tokenId = this.$route.query.tokenId

      if (!token || !tokenId || token.length !== 128 || tokenId.length !== 24) {
        this.$router.replace('/401')
      }

      stitchClient.auth.provider('userpass').emailConfirm(tokenId, token)
        .then(result => {
          // redirect user to sign-in page with message that their email is confirmed
          this.$router.replace('/auth/sign-in?action=emailConfirmed')
        })
        .catch((error) => {
          console.log(JSON.stringify(error))

          if (error.error === 'link is expired or invalid') {
            this.message = {
              text: 'Your confirmation link has expired or is invalid. <a href="/auth/resend-confirmation">Click here</a> to get another one.',
              type: 'is-danger'
            }
          } else {
            this.message = {
              type: 'is-danger',
              text: error.error
            }
          }
        })
    },
    components: {
      Notification
    },
    data () {
      return {
        message: {}
      }
    }
  }
</script>
