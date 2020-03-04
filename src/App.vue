<template>
  <div id="app">

    <page-header></page-header>

    <div id="site-alert" v-if="siteAlert">
      <b>Write</b>Flow will be down for system maintenance starting at 1:00 AM PST for 4 hours.
    </div>

    <router-view id="router-view"></router-view>

    <page-footer></page-footer>

  </div>
</template>

<script>
  import PageHeader from '@/components/PageHeader'
  import PageFooter from '@/components/PageFooter'

  var siteAlert = false

  // On page scroll, fix the notification bar to the top
  if (siteAlert) {
    window.addEventListener('scroll', function (e) {
      if (window.scrollY > document.getElementById('site-alert').offsetTop) {
        document.getElementById('site-alert').addClass('fixed')
        document.getElementById('router-view').style.marginTop = '4rem'
      } else if (window.scrollY <= document.getElementById('site-alert').offsetTop) {
        document.getElementById('site-alert').removeClass('fixed')
        document.getElementById('router-view').style.marginTop = ''
      }
    })
  }

  export default {
    name: 'app',
    components: {
      PageHeader,
      PageFooter
    },
    data () {
      return {
        siteAlert
      }
    },
    methods: {}
  }
</script>

<style>
  #router-view {
    min-height: 75vh;
  }

  .button {
    font-weight: 500;
  }
  .message-body {
    border: none;
  }

  .title {
    font-weight: normal;
  }

  strong {
    font-weight: 500 !important;
  }

  #site-alert {
    z-index: 100;
    text-align: center;
    background-color: #fe9;
    width: 100%;
    padding: 1rem 0;
  }
  .fixed {
    position: fixed;
    top: 0;
  }
</style>
