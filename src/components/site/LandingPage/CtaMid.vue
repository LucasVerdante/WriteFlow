<template>

  <section class="section">
    <div class="container">

      <div class="tile is-ancestor">

        <div class="tile is-parent is-6 has-text-centered">

          <article class="tile is-child notification is-success">
            <h2 class="title is-2">Try it Out for 30 Days, Free!</h2>
            <p class="title is-4">No commitment and no credit card required</p>

            <router-link class="button is-large is-light" to="/auth/sign-up" v-if="$store.state.allowAuth">Start Free Trial</router-link>

            <button class="button is-large is-light" disabled v-else>Start Free Trial</button>
          </article>

        </div>

        <div class="tile is-parent is-6 has-text-centered">

          <article class="tile is-child notification is-light">
            <h2 class="title is-2">Learn How it Works</h2>

            <router-link class="button is-large is-info" to="/guide">View the Guide</router-link>
          </article>

        </div>

      </div>

    </div>
  </section>

</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
