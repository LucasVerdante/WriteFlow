<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8-desktop is-offset-2-desktop">

          <h1 class="title is-2">Frequently Asked Questions</h1>

          <p>If you have a question that's not covered here, please contact me at <a href="mailto:support@getwriteflow.com">support@getwriteflow.com</a>. I'll get back to you as soon as I can.</p>

          <p>&mdash;Lyndon</p>

          <h2 class="title is-3">Contents</h2>

          <ul>
            <li v-for="section in faq"><a :href="'#' + section.anchor">{{ section.section }}</a></li>
          </ul>

          <hr>

          <div v-for="section in faq">
            <h3 class="title is-4 has-text-primary" :id="section.anchor">{{ section.section }}</h3>
            <div v-for="question in section.questions">
              <h4 class="title is-5 has-text-info">{{ question.question }}</h4>
              <p v-for="paragraph in question.answer" v-html="paragraph"></p>
            </div>
          </div>

        </div><!-- /page column -->
      </div><!-- /page columns -->
    </div><!-- /page container -->
  </section>
</template>

<script>
  export default {
    data () {
      return {
        faq: [
          {
            section: 'About WriteFlow',
            anchor: 'about-writeflow',
            questions: [
              {
                question: 'What is WriteFlow?',
                answer: [
                  'WriteFlow is a web browser based online app designed to help you write quality essays, cover letters, and other documents.'
                ]
              },
              {
                question: 'How will WriteFlow help me write better?',
                answer: [
                  'If you feel you can use some help with writing, WriteFlow provides you with a systematic approach:',
                  '<ul>' +
                  "<li>To eliminate writer's block, the app helps you to just get your thoughts down on the page.</li>" +
                  '<li>The app provides easy, drag and drop functionality so you can sort your sentences so that they make logical sense.</li>' +
                  // '<li>A color-coded preview section makes for more effective as-you-go proof reading.</li>' +
                  '<li>Document templates help ensuring that your statements are well supported.</li>' +
                  '</ul>',
                  'Check out the <a href="/guide">guide</a> for more details.</li>',
                  "If you feel you're already great at writing, WriteFlow just might help you continue writing great <i>but faster</i>."
                ]
              },
              {
                question: 'What devices can I use WriteFlow on?',
                answer: [
                  'WriteFlow works best on screens that are laptop computer sized and larger.',
                  'WriteFlow can be used on tablet devices but you may find it awkward trying to type sentences with an on-screen keyboard. The use of a Bluetooth wireless keyboard is strongly recommended.',
                  "WriteFlow also works on smartphones, but the screen will likely be too cramped for proper editing. I recommend using WriteFlow on your smartphone only when you're on the go and suddenly have an idea to jot down for editing later."
                ]
              },
              {
                question: 'Can I get WriteFlow in the App Store or on Google Play?',
                answer: [
                  "No, writing isn't most effectively done on smartphones. Most people use laptops or desktop computers. For that reason, WriteFlow isn't a a specific iPhone or Android app. But, I may consider making a WriteFlow Chrome extension in the future."
                ]
              }
            ]
          },
          {
            section: 'Features',
            anchor: 'features',
            questions: [
              {
                question: '* Coming soon *',
                answer: ['']
              }
            ]
          },
          {
            section: 'Privacy and Payments',
            anchor: 'privacy-and-payments',
            questions: [
              {
                question: 'Is my personal information safe?',
                answer: [
                  'Yes! WriteFlow takes as many precautions as reasonably possible to ensure your data is safe.',
                  "WriteFlow's databases are contracted to <a href='https://www.mongodb.com/cloud/atlas' target='_blank'>MongoDB</a>, a company that specializes in fast and secure databases. As you may have noticed, the <a href='/auth/sign-up'>sign-up</a> form only asks for an email address and password. If I don't collect and store your sensitive, personal information, I can't put it at risk of exposure.",
                  "<a href='https://en.wikipedia.org/wiki/Transport_Layer_Security' target='_blank'>SSL</a> is used to ensure that data transmissions with the app are private.",
                  "Credit card payments are handled by another specialized company, <a href='https://stripe.com' target='_blank'>Stripe</a>. More on that below."
                ]
              },
              {
                question: 'How are credit card payments safely handled?',
                answer: [
                  'Glad you asked! WriteFlow uses <a href="https://stripe.com" target="_blank">Stripe</a> for credit card payment processing. A main reason for this is because handling credit card information is a serious, highly scrutinized, heavily regulated industry for a good reason: Nobody wants to be a victim of credit card fraud. Stripe specializes in handling credit card payments, safe and secure.',
                  "When you send a payment for WriteFlow services, your information goes directly from your browser to Stripe's secure servers. I don't see any of your credit card information. They send me a notification when the payment has gone through. This is the most secure method for you and me.",
                  '<a href="https://stripe.com" target="_blank"><img src="' + require('@/assets/img/logos/powered_by_stripe.svg') + '"></a>'
                ]
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
  p {
    margin-bottom: 1.5rem;
  }
</style>
