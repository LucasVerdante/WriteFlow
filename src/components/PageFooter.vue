<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">

        <div class="column is-3">
          <h4 class="title"><router-link to="/"><b>Write</b>Flow</router-link></h4>
        </div>

        <div class="column is-3">
          <ul>
            <!--
            <li><router-link class="has-text-primary" to="/examples">Examples</router-link></li>
            -->
            <li><router-link class="has-text-primary" to="/guide">Guide</router-link></li>
            <li><router-link class="has-text-primary" to="/frequently-asked-questions">FAQ</router-link></li>
            <li><router-link class="has-text-primary" to="/pricing">Pricing</router-link></li>
            <li><router-link class="has-text-primary" to="/about">About</router-link></li>

            <li><router-link class="has-text-primary" to="/terms-of-service">Terms of Service</router-link></li>
            <li><router-link class="has-text-primary" to="/privacy-policy">Privacy Policy</router-link></li>
          </ul>
        </div>

        <div class="column is-3">
          <p>&copy; {{ currentYear }} WriteFlow</p>
        </div>

        <div class="column is-3">
          <p>
            <a href="https://heapanalytics.com/?utm_source=badge" rel="nofollow"><img style="width:108px;height:41px" src="//heapanalytics.com/img/badge.png" alt="Heap | Mobile and Web Analytics" /></a>
          </p>
        </div>

      </div>

    </div>
  </footer>
</template>

<script>
  export default {
    created () {
      var today = new Date()

      this.currentYear = today.getFullYear()
    },
    data () {
      return {
        currentYear: ''
      }
    }
  }
</script>

<style scoped>
  h4 a {
    color: #fff;
  }
  .footer {
    background-color: #333;
    color: #fff;
    padding-bottom: 3rem;
  }
</style>
