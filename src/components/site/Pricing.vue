<template>
  <div>
    <section class="section">
      <div class="container has-text-centered">
        <div class="columns">
          <div class="column is-8-desktop is-offset-2-desktop">

            <p class="title is-3"><b>Write</b>Flow is free for 30 days</p>

            <p class="title is-6">Then, pricing is <i>as you go</i> at</p>

            <p class="title is-3">
              <span class="title is-1 has-text-primary">$5</span> for 30 days of access
              <span class="title is-4 has-text-grey">&nbsp;or&nbsp;</span>
              <span class="title is-1 has-text-primary">$50</span> for a year of access
            </p>

            <p class="title is-4">No auto-renewal. Only pay when you use the app.</p>

            <p class="title is-6">When your 30 day trial or purchased access expires, you'll be prompted to make a payment next time you sign-in</p>

            <p class="title is-6">You can purchase another month or leave things until you have something new to write</p>

            <p class="title is-6">If you only write a few times a year, you only pay when you have to use the app</p>

            <p class="title is-6">Your documents are kept safe until you come back, but you won't be able to edit them until you renew your account</p>

          </div><!-- /column -->
        </div><!-- /page column -->
      </div><!-- /page container -->
    </section>

    <widget-sign-up></widget-sign-up>
  </div>
</template>

<script>
  import WidgetSignUp from '@/components/site/WidgetSignUp'

  export default {
    components: {
      WidgetSignUp
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>
  .button {
    font-size: 2rem;
  }
</style>
