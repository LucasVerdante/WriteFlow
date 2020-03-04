<template>
  <div :class="'notification ' + message.type" id="notification" v-if="message.type && message.text" v-html="message.text">
    <button class="close">ss</button>
  </div>
</template>

<script>
  export default {
    props: ['message']
  }
</script>
