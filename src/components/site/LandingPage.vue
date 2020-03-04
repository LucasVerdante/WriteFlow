<template>
  <div>
    <hero></hero>
    <intro></intro>
    <features></features>
    <cta-mid></cta-mid>
    <pricing></pricing>
    <cta-trial></cta-trial>
  </div>
</template>

<script>
  import Hero from '@/components/site/LandingPage/Hero'
  import Intro from '@/components/site/LandingPage/Intro'
  import Features from '@/components/site/LandingPage/Features'
  import CtaMid from '@/components/site/LandingPage/CtaMid'
  import Pricing from '@/components/site/LandingPage/Pricing'
  import CtaTrial from '@/components/site/LandingPage/CtaTrial'

  export default {
    components: {
      Hero,
      Intro,
      Features,
      CtaMid,
      Pricing,
      CtaTrial
    }
  }
</script>
