<template>

  <section class="section">
    <div class="container">
      <h2 class="title is-1 has-text-centered">Features</h2>

      <br><br>

      <div class="columns">
        <div class="column is-10-desktop is-offset-1-desktop">
          <div class="columns is-multiline">
            <div class="column is-6 has-text-centered" v-for="point in points">
              <figure class="image is-128x128">
                <img :src="point.icon">
              </figure>

              <br><br>

              <h3 class="title is-3 has-text-centered">{{ point.header }}</h3>
              <p v-html="point.description"></p>
            </div>

          </div>
        </div>
      </div>

    </div>

  </section>

</template>

<script>
  export default {
    data () {
      return {
        points: [
          {
            header: "No More Writer's Block",
            icon: require('@/assets/img/icons/idea.svg'),
            description: 'Start with one of our writing templates to outline your thesis and supporting points. Put your ideas into the template wherever you think they best fit. You can sort and refine them after.'
          },
          {
            header: 'A Template For Success',
            icon: require('@/assets/img/icons/list.svg'),
            description: 'Several, actually. With more being added. WriteFlow can be used for writing essays, cover letters, resumés, and more.'
          },
          {
            header: 'In The Cloud',
            icon: require('@/assets/img/icons/cloud-computing.svg'),
            description: 'Your documents are stored in secure databases and accessible from anywhere you have an internet connection. You can even access WriteFlow from your smartphone on the go to jot down spontaneous ideas.'
          },
          {
            header: 'Unlimited Documents',
            icon: require('@/assets/img/icons/file.svg'),
            description: "Use WriteFlow to create as many documents as you want. Don't ever worry about running out of space."
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .columns:not(:last-child) {
    margin-bottom: 3rem;
  }
  .image {
    display: inline-block;
  }
</style>
