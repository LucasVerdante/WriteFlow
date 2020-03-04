<template>
  <div class="notification is-warning is-hidden-desktop">
    <a class="delete" @click="dismiss"></a>
    <p><b>Tip:</b> WriteFlow is designed to work on mobile devices, but works best on laptop screens or larger.</p>
  </div>
</template>

<script>
  export default {
    methods: {
      dismiss (e) {
        e.target.parentNode.remove()
      }
    }
  }
</script>

<style scoped>
  p {
    margin-right: 2rem;
  }
</style>
