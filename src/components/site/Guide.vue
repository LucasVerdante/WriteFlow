<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8-desktop is-offset-2-desktop">
          <h1 class="title is-2">Guide</h1>
          <h1 class="subtitle is-4">How It Works</h1>

          <br><br>

          <div class="columns" v-for="point in points">

            <div class="column is-8">
              <h3 class="title is-4">{{ point.header }}</h3>
              <p v-html="point.description"></p>
            </div>

            <div class="column is-4">
              <figure class="image is-128x128">
                  <img :src="point.img">
                </figure>
            </div>

          </div><!-- /columns -->
        </div><!-- /page column -->
      </div><!-- /page columns -->
    </div><!-- /page container -->
  </section>
</template>

<script>
  export default {
    data () {
      return {
        points: [
          {
            header: '1. Start With a Template',
            img: require('@/assets/img/icons/structure.svg'),
            description: "Use one of our writing templates to outline what you're going to say and how you're going to support it."
          },
          {
            header: '2. Jot Down Your Ideas',
            img: require('@/assets/img/icons/organization.svg'),
            description: "Don't worry about making things sound profound or smooth; just get your ideas into the template. You might not even have everything you're going to say in the beginning. You can even jot down ideas when you're on the go and sort/refine them later. The app will work on your smartphone."
          },
          {
            header: '3. Make Your Ideas Flow',
            img: require('@/assets/img/icons/link.svg'),
            description: "Use the editor's drag and drop functionality to sort your statements so they make sense. You'll be able to view your changes in the preview window."
          },
          {
            header: '4. Add Supporting Statements',
            img: require('@/assets/img/icons/list-1.svg'),
            description: "The document template provides a good point of reference for ensuring your writing is thorough. Keep in mind that each template field is optional and can be omitted. Use your gut feeling if you've presented your ideas well enough, or simply fill in the template as if it were a checklist."
          },
          {
            header: "5. Proof Read As You Go (and of course before you're done)",
            img: require('@/assets/img/icons/list.svg'),
            description: "Each time you reorder your statements, use the preview pane to see if it produces the desired result. Edit sentences, reorder, refine until you're happy."
          },
          {
            header: '6. Deliver',
            img: require('@/assets/img/icons/send.svg'),
            description: 'All done! Copy and paste your work into an email, blog post, etc.'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
