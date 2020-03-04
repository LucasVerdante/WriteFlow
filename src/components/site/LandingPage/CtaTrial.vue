<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-1">30 Day Free Trial</h1>
        <h2 class="subtitle is-4">No Credit Card Required</h2>

        <router-link class="button is-large is-light" to="/auth/sign-up" v-if="$store.state.allowAuth">Start Your Free Trial</router-link>

        <button class="button is-large is-light" disabled v-else>Start Free Trial</button>
      </div>
    </div>
  </section>
</template>
