<template>
  <section class="section">

    <div class="container">

      <notification-screen-size></notification-screen-size>

      <notification :message="message"></notification>

      <h1 class="title">My Documents</h1>

      <spinner v-if="documents === null"></spinner>

      <div v-else>
        <a class="button is-info is-large" @click="newDoc" v-if="allowAccess">New Document</a>
        <a class="button is-info is-large" disabled v-else>New Document</a>

        <br><br>

        <div class="columns is-multiline" v-if="documents.length > 0">
          <!-- DOCUMENT CARDS -->
          <div class="column is-6-tablet is-3-desktop" v-for="doc in documents" style="position:relative">
            <div class="doc notification" @click="$router.push('/app/editor/' + doc._id)" v-if="allowAccess">
              <h4 class="title is-4">{{ doc.title }}</h4>
            </div>
            <div class="doc-disabled notification" v-else>
              <h4 class="title is-4">{{ doc.title }}</h4>
            </div>

            <button class="delete doc-delete is-medium" @click="deleteDocConfirm(doc._id)" v-if="allowAccess"></button>
            <button class="delete doc-delete is-medium" disabled v-else></button>
          </div>
        </div><!-- /columns -->

        <h4 class="title is-5" v-else>No documents found</h4>
      </div>

    </div>

    <!-- CONFIRM DELETE MODAL -->
    <div class="modal" id="modal-confirm-delete" v-if="allowAccess">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirm Delete</p>
          <button class="delete" @click="deleteDocClose"></button>
        </header>

        <section class="modal-card-body">
          <p>Are you sure you want to delete the document <b>{{ deleteDocTitle }}</b>?</p>
        </section>

        <footer class="modal-card-foot">
          <button class="button is-danger" @click="deleteDoc">Delete</button>
          <button class="button" @click="deleteDocClose">Cancel</button>
        </footer>
      </div><!-- /modal-card -->
    </div><!-- /modal -->

    <!-- TEMPLATE SELECT MODAL -->
    <div class="modal" id="modal-template-select" v-if="allowAccess">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Select Template</p>
          <button class="delete" @click="newDocClose"></button>
        </header>

        <section class="modal-card-body">
          <div class="columns is-multiline">

            <div class="column is-4-tablet" v-for="template in templates" style="position:relative">
              <div class="template-disabled notification" v-if="template.status == 'Coming Soon'">
                <p class="title is-6">{{ template.name }}</p>
                <p class="subtitle is-6 has-text-grey-light"><small>{{ template.status }}</small></p>
              </div>

              <div class="template notification" v-else @click="$router.push('/app/editor/new/' + template.ref)">
                <p class="title is-6">{{ template.name }}</p>
                <p class="subtitle is-6 has-text-grey-light"><small>{{ template.status }}</small></p>
              </div>
            </div>

          </div>
        </section>

        <footer class="modal-card-foot">
        </footer>
      </div><!-- /modal-card -->
    </div><!-- /modal -->

  </section>
</template>

<script>
  import Notification from '@/components/app/Notification'
  import NotificationScreenSize from '@/components/app/NotificationScreenSize'
  import Spinner from '@/components/Spinner'

  import stitchClient from '@/mongoDBServices'
  import { BSON } from 'mongodb-extjson'

  var { ObjectID } = BSON

  var mongoClient = stitchClient.service('mongodb', 'mongodb-atlas')
  var collAccounts = mongoClient.db('users').collection('accounts')
  var collDocuments = mongoClient.db('main').collection('documents')
  // var collTemplates = mongoClient.db('app').collection('templates')

  export default {
    components: {
      Notification,
      NotificationScreenSize,
      Spinner
    },
    created () {
      this.getDocuments()

      // Get tempates
      stitchClient.executeFunction('getTemplates')
        .then(data => {
          this.templates = data
        })
        .catch(error => console.error(error))
      /*
      collTemplates.find({active: 1}).execute()
        .then(data => {
          this.templates = data
        })
        .catch(error => console.log(error))
      */

      // Init user
      // Check memebership in users.accounts
      collAccounts
        .find({_id: stitchClient.authedId()}).limit(1).execute()
        .then(data => {
          if (!data.length) {
            // No account data found, init a trial date

            var expiry = new Date()
            expiry.setDate(expiry.getDate() + 30)

            // Create the account record
            collAccounts
              .insertOne({
                _id: stitchClient.authedId(),
                dateCreated: new Date(),
                dateRenew: expiry,
                renewHistory: []
              })
              .catch(error => console.error(error))
          } else {
            // Account data found
            // Check if Date() > dateRenew
            var account = data[0]
            var dateRenew = account.dateRenew
            var today = new Date()

            if (today > dateRenew) {
              // Time for user to buy access
              this.allowAccess = false

              if (account.renewHistory.length > 0) {
                // Standard renewal message
                this.message = {
                  text: 'Your account access has expired. Please visit the <a href="/my-account/billing">Billing</a> page to renew your account.',
                  type: 'is-warning'
                }
              } else {
                // Free trial expired renewal message
                this.message = {
                  text: 'Your WriteFlow free trial has expired. Hope you found the service useful! Please visit the <a href="/my-account/billing">Billing</a> page to purchase access.',
                  type: 'is-warning'
                }
              }
            }
          }
        })
        .catch(error => console.error(error))
    },
    data () {
      return {
        allowAccess: true,
        deleteDocId: null,
        deleteDocTitle: '',
        documents: null,
        message: {},
        templates: []
      }
    },
    methods: {
      deleteDoc () {
        collDocuments
          .updateOne(
          {
            _id: new ObjectID(this.deleteDocId),
            owner_id: stitchClient.authedId()
          },
          {
            $set: { active: 0 }
          })
          .then(res => {
            this.getDocuments()
          })
          .catch(() => {
            this.message = {
              text: 'An error has occurred. Your document could not be deleted at this time. Please try again.',
              type: 'is-danger'
            }
          })

        this.deleteDocClose()
      },
      deleteDocClose () {
        this.deleteDocId = null
        this.deleteDocTitle = ''
        document.getElementById('modal-confirm-delete').removeClass('is-active')
      },
      deleteDocConfirm (docId) {
        this.deleteDocId = docId

        for (var i = 0; i < this.documents.length; i++) {
          if (this.documents[i]._id === docId) {
            this.deleteDocTitle = this.documents[i].title
          }
        }

        document.getElementById('modal-confirm-delete').addClass('is-active')
      },

      getDocuments () {
        collDocuments
          .find(
            {owner_id: stitchClient.authedId()},
            {_id: 1, title: 1}
          )
          .execute()
          .then(data => {
            this.documents = data
          })
      },

      newDoc () {
        document.getElementById('modal-template-select').addClass('is-active')
      },
      newDocClose () {
        document.getElementById('modal-template-select').removeClass('is-active')
      }
    }
  }
</script>

<style scoped>
  .button {
    font-weight: 500;
  }
  .doc, .doc-disabled {
    height: 12rem;
  }
  .doc:hover {
    background-color: #eee;
    cursor: pointer;
  }
  .doc-disabled:hover {
    cursor: not-allowed;
  }
  .doc h4, .doc-disabled h4 {
    font-weight: 500;
    height: 10rem;
    width: 95%;
    overflow: hidden;
  }
  .doc-delete {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }

  .template, .template-disabled {
    background-color: #07f;
    color: #fff;
    height: 7rem;
  }

  .template:hover {
    cursor: pointer;
    opacity: 0.95;
  }

  .template-disabled {
    opacity: 0.75;
  }
</style>
