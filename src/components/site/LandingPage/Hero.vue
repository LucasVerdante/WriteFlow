<template>

  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1"><strong>Eliminate Writer's Block</strong></h1>

        <div class="columns">
          <div class="column is-8-tablet is-7-desktop">
            <p class="title is-4">
              <b>Write</b>Flow makes it easy.
              Get your ideas down on paper.
              Order them so that they flow.
              Add personality.
              Produce quality writing.
            </p>

            <p class="title is-4"><b>Try it out for 30 days, Free</b></p>

            <router-link class="button is-large is-success" to="/auth/sign-up" v-if="$store.state.allowAuth">Sign-up</router-link>

            <button class="button is-large is-success" disabled v-else>Sign-up</button>

            <router-link to="/guide" class="button is-large is-info">How It Works</router-link>
          </div>
        </div><!-- /columns -->

      </div>
    </div>
  </section>

</template>

<script>
  export default {
    components: {

    },
    data: function () {
      return {

      }
    }
  }
</script>

<style scoped>
/*
business-woman.jpg
man-people-space-desk.jpg
woman-typing-writing.jpg
*/
  .hero {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.0)), url('../../../assets/img/splash/man-people-space-desk.jpg') no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -ms-background-size: cover;
    background-size: cover;
    min-height: 75vh;
  }

  h1, p {
    color: #fff;
  }

  p {
    line-height: 1.2;
  }

  .button {
    font-size: 1.5rem;
    width: 11rem;
  }
</style>
