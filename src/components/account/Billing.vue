<template>
  <div>
    <notification :message="notificationMessage"></notification>

    <h1 class="title is-2">Billing</h1>

    <spinner v-if="isLoading"></spinner>

    <div v-else>
      <table class="table is-bordered">
        <tbody>
          <tr v-if="freeTrial">
            <th>Account Type</th>
            <td>
              <strong class="has-text-success">Free Trial</strong>
            </td>
          </tr>

          <tr>
            <th>Account Renewal Date</th>
            <td>
              <strong class="has-text-success" v-if="dateRenewUnix >= today">{{ dateRenewDisplay }}</strong>
              <strong class="has-text-danger" v-else>{{ dateRenewDisplay }}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="content" v-if="dateRenewUnix >= today">
        <p>Your account access is valid until {{ dateRenewDisplay }}, after which you'll have to add more time.</p>
        <p>You can also add more time now to extend your renewal date further.</p>
      </div>
      <div class="content" v-else>
        <p>Your account access has expired. Please purchase more time via the buttons below:</p>
      </div>

      <p>
        <button class="button is-info" @click="stripePurchase('30 Day Access', 500, '30days500')">Add 30 Days of Access - $5</button>
        <br class="is-hidden-tablet">
        <br class="is-hidden-tablet">
        <button class="button is-info" @click="stripePurchase('1 Year Access', 5000, '365days5000')">Add 1 Year of Access - $50</button>
      </p>
    </div>
  </div>
</template>

<script>
  import stitchClient from '@/mongoDBServices'
  import Notification from '@/components/app/Notification'
  import Spinner from '@/components/Spinner'

  var collectionAccounts = stitchClient.service('mongodb', 'mongodb-atlas').db('users').collection('accounts')

  export default {
    components: {
      Notification,
      Spinner
    },

    created () {
      // Check memebership in users.accounts
      this.getAccount()
    },

    data () {
      return {
        freeTrial: false,
        isLoading: true,
        dateRenewDisplay: '',
        dateRenewUnix: '',
        notificationMessage: {},
        today: new Date()
      }
    },

    methods: {
      getAccount () {
        this.isLoading = true

        collectionAccounts
          .find({_id: stitchClient.authedId()})
          .execute()
          .then(data => {
            var account = data[0]

            if (account.renewHistory.length === 0) {
              this.freeTrial = true
            } else {
              this.freeTrial = false
            }

            this.dateRenewDisplay = this.formatDate(account.dateRenew)
            this.dateRenewUnix = account.dateRenew

            this.isLoading = false
          })
          .catch(error => {
            console.error(error)

            this.isLoading = false
          })
      },

      stripePurchase (description, amount, planId) {
        this.$checkout.open({
          description: description,
          amount: amount,
          token: tokenObject => {
            this.isLoading = true

            stitchClient.executeFunction('stripeCharge', tokenObject.id, planId)
              .then(data => {
                if (data.success) {
                  this.notificationMessage = {
                    text: 'Your account has been updated',
                    type: 'is-success'
                  }
                } else {
                  console.error(data)

                  this.notificationMessage = {
                    text: 'An error has occurred, please try again or contact <a href="mailto:support@getwriteflow.com?subject=Purchase error">support@getwriteflow.com</a>.',
                    type: 'is-danger'
                  }
                }

                this.getAccount()
              })
              .catch(error => {
                console.error(error)

                this.notificationMessage = {
                  text: 'An error has occurred, please try again or contact <a href="mailto:support@getwriteflow.com?subject=Purchase error">support@getwriteflow.com</a>.',
                  type: 'is-danger'
                }

                this.getAccount()
              })
          }
        })
      },

      formatDate (rawDate) {
        var date = new Date(rawDate)
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        var year = date.getFullYear()
        var month = months[date.getMonth()]
        var day = date.getDate()
        /*
        var hour = date.getHours()
        var minute = date.getMinutes()
        var amPm = hour < 12 ? 'am' : 'pm'

        if (hour === 0) {
          hour = 12
        }
        if (hour > 12) {
          hour -= 12
        }
        if (minute <= 9) {
          minute = '0' + minute
        }
        */
        return month + ' ' + day + ', ' + year// + ' at ' + hour + ':' + minute + ' ' + amPm
      }
    }
  }
</script>
