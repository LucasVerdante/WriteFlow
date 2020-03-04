<template>
  <div>

    <section class="section">
      <div class="container has-text-centered">

        <h2 class="title is-1" id="pricing">Pricing</h2>

        <br>

        <p class="title is-5">Free for 30 days, then</p>

        <p class="title is-3">
          <span class="title is-1 has-text-primary">$5</span><span class="title is-3">/month</span>
          &nbsp;or&nbsp;
          <span class="title is-1 has-text-primary">$50</span><span class="title is-3">/year</span>
        </p>

        <br>

        <div class="columns">
          <div class="column is-4 is-offset-4">
            <router-link to="/auth/sign-up" class="button is-large is-info is-fullwidth" v-if="$store.state.allowAuth">Sign-up</router-link>
            <button class="button is-large is-info is-fullwidth" disabled v-else>Sign-up</button>
          </div>
        </div>

<!--
        <h3 class="title is-3">Have a Team?</h3>
        <p class="title is-5">Business plans are also available. <a href="mailto:accounts@getwriteflow.com?subject=Business Account">Contact us</a> for business pricing.</p>
-->

        <br>

      </div><!-- /container -->
    </section>

  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .button {
    font-size: 2rem;
  }
  .price {

  }
</style>
