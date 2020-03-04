<template>
  <div>
    <section class="section">
      <div class="container is-fluid">

        <notification-screen-size></notification-screen-size>

        <notification :message="message"></notification>

        <h2 class="title">{{ documentTitle || 'Editor' }}</h2>

        <spinner v-if="document.length === 0"></spinner>

        <div v-else>
          <!-- Doc Action Buttons -->
          <div>
            <div class="is-pulled-right">
              <button class="button is-success is-medium save-button" @click="save">Save</button>
              <!--
              <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                  <button class="button is-success is-outlined" aria-haspopup="true" aria-controls="export-menu">
                    <span>Export</span>
                    <span class="icon is-small"><i class="fa fa-caret-down"></i></span>
                  </button>
                </div>
                <div class="dropdown-menu" id="export-menu" role="menu">
                  <div class="dropdown-content">
                    <a href="" class="dropdown-item">Word</a>
                    <a href="" class="dropdown-item">PDF</a>
                    <a href="" class="dropdown-item">Plain Text</a>
                  </div>
                </div>
              </div>
            -->
            </div>
          </div>


          <h2 class="subtitle">5 Paragraph Essay</h2>

          <p class="has-text-grey" v-model="documentCreated" v-if="documentCreated"><small>Created on {{ formatDate(documentCreated) }}</small></p>
          <p class="has-text-grey" v-model="documentLastSaved" v-if="documentLastSaved"><small>Last saved on {{ formatDate(documentLastSaved) }}</small></p>

          <br>

          <div class="columns">

            <!-- WORK AREA -->
            <div class="column">
              <div class="notification">

                <div class="field">
                  <label class="label">Essay Title</label>
                  <div class="control">
                    <input type="text" class="input is-medium" v-model="documentTitle" :value="documentTitle">
                  </div>
                </div>

                <div class="is-pulled-right">
                  <button class="button is-small" v-on:click="toggleCollapseAll('collapse')">
                    <span class="icon is-small"><i class="fa fa-compress"></i></span>
                    <span>All</span>
                  </button>

                  <button class="button is-small" v-on:click="toggleCollapseAll('expand')">
                    <span class="icon is-small"><i class="fa fa-expand"></i></span>
                    <span>All</span>
                  </button>
                </div>

                <div class="field">
                  <label class="label">Document Template</label>
                </div>

                <!-- Paragraph -->

                <!-- Draggable sentence -->
                <draggable v-model="document" :options="draggableOptions">

                  <div class="box workspace-paragraph" v-for="(paragraph, p_index) in document">
                    <article class="media">

                      <!-- Paragraph Drag Handle -->
                      <div class="media-left">
                        <drag-handle></drag-handle>
                      </div>

                      <div class="media-content">

                        <!-- Paragraph Options Buttons -->
                        <div class="is-pulled-right">

                          <!-- Button: Toggle Collapse -->
                          <button class="button is-small" v-on:click="toggleCollapse(p_index)">
                            <span class="icon is-small"><i class="fa fa-compress"></i></span>
                          </button>

                          <!-- Button: Delete Paragraph -->
                          <button-delete v-on:click.native="deleteParagraph(p_index)"></button-delete>
                        </div>



                        <p class="is-clearfix"><b>{{ paragraph.title }}</b></p>

                        <div class="collapsible" :id="'collapsible_' + p_index">

                          <!-- Draggable sentence -->
                          <draggable v-model="paragraph.sentences" :options="draggableOptions">

                            <div class="field" v-for="(sentence, s_index) in paragraph.sentences">
                              <article class="media">

                                <!-- Sentence Drag Handle -->
                                <div class="media-left">
                                  <drag-handle></drag-handle>
                                </div>

                                <!-- Sentence Input -->
                                <div class="media-content">
                                  <small class="has-text-grey">{{ sentence.title }}</small>
                                  <textarea class="textarea" v-model="sentence.content" :placeholder="sentence.placeholder">{{ sentence.content }}</textarea>
                                </div>

                                <!-- Sentence Options -->
                                <div class="media-right">
                                  <button-delete v-on:click.native="deleteSentence(p_index, s_index)"></button-delete>
                                </div>

                              </article>
                            </div>

                          </draggable>

                          <br>

                          <!-- Add Sentence Button -->
                          <button class="button is-small" v-on:click="addSentence(paragraph)">
                            <span class="icon is-small"><i class="fa fa-plus"></i></span>
                            <span>Sentence</span>
                          </button>
                        </div><!-- /collapsible div -->
                      </div>

                    </article>
                  </div><!-- /box -->

                </draggable>

                <br>

                <!-- Add Paragraph Button -->
                <button class="button" v-on:click="addParagraph()">
                  <span class="icon is-small"><i class="fa fa-plus"></i></span>
                  <span>Paragraph</span>
                </button>

              </div>

              <button class="button is-success is-medium save-button" @click="save">Save</button>


            </div><!-- /work area -->

            <!-- PREVIEW AREA -->
            <div class="column">
              <div class="notification">
                <div id="clipboard-output">
                  <h1 class="title is-4">{{ documentTitle || 'Untitled Essay' }}</h1>

                    <div class="content" id="preview">

                    <p v-for="paragraph in document">
                      <span v-for="sentence in paragraph.sentences">{{ previewSentence(sentence.content) }}</span>
                    </p>

                  </div>
                </div>

                <div class="has-text-right">
                  <button class="button is-small copy-button" data-clipboard-target="#clipboard-output" @click="timedNotification({text:'Copied to clipboard!',type:'is-success'})"><span class="icon"><i class="fa fa-clipboard"></i></span>&nbsp; Copy to Clipboard</button>
                </div>
              </div>
            </div><!-- /column -->

          </div><!-- /columns -->

        </div>
      </div><!-- /container -->
    </section>

    <!-- TO DO: REPLACE JS CONFIRM WITH CUSTOM MODAL
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirm Delete</p>
          <button class="delete"></button>
        </header>
        <section class="modal-card-body">
          Are you sure you'd like to delete the entire paragraph?
        </section>
        <footer class="modal-card-foot">

          <button class="button">Cancel</button>
          <a class="button is-primary">Confirm</a>
        </footer>
      </div>
    </div>
    -->


  </div>
</template>

<script>
  import Notification from '@/components/app/Notification'
  import NotificationScreenSize from '@/components/app/NotificationScreenSize'
  import Spinner from '@/components/Spinner'

  import stitchClient from '@/mongoDBServices'
  import Clipboard from 'clipboard'
  import draggable from 'vuedraggable'
  import { BSON } from 'mongodb-extjson'

  /* eslint-disable no-new */
  new Clipboard('.copy-button')

  var { ObjectID } = BSON

  var mongoClient = stitchClient.service('mongodb', 'mongodb-atlas')
  var collAccounts = mongoClient.db('users').collection('accounts')
  var collDocuments = mongoClient.db('main').collection('documents')
  var collTemplates = mongoClient.db('app').collection('templates')

  var DragHandle = {
    template: '<i class="fa fa-sort"></i>'
  }

  var ButtonDelete = {
    template:
      '<button class="button is-small">' +
        '<span class="icon is-small"><i class="fa fa-times"></i></span>' +
      '</button>'
  }

  // import EssayTemplate from '@/doctemplates/essay'

  export default {
    components: {
      ButtonDelete,
      draggable,
      DragHandle,
      Notification,
      NotificationScreenSize,
      Spinner
    },

    created () {
      var router = this.$router

      // Check user account
      collAccounts
        .find({ _id: stitchClient.authedId() })
        .limit(1)
        .execute()
        .then(data => {
          if (!data.length) {
            // No account data found, boot 'em'
            router.replace('/401')
          } else {
            // Account data found
            // Check if Date() > dateRenew
            var account = data[0]
            var dateRenew = account.dateRenew
            var today = new Date()

            if (today > dateRenew) {
              // Time for user to buy access
              router.replace('/my-account/billing')
            }
          }
        })
        .catch(error => console.error(error))

      // These should be one or the other
      var documentId = router.currentRoute.params.documentId
      var templateRef = router.currentRoute.params.templateRef

      if (documentId) {
        // EDIT DOCUMENT, fetch content

        if (documentId.length !== 24) {
          router.replace('/404')
        }

        collDocuments
          .find({
            '_id': new ObjectID(documentId),
            'owner_id': stitchClient.authedId()
          })
          .limit(1).execute()
          .then(data => {
            if (data.length) {
              this.document = data[0].content
              this.documentCreated = data[0].created
              this.documentLastSaved = data[0].lastSaved
              this.documentTitle = data[0].title
            } else {
              router.replace('/404')
            }
          })
          .catch(error => {
            console.log(error)

            router.replace('/404')
          })
      } else if (templateRef) {
        // NEW DOCUMENT, fetch template
        collTemplates
          .find({ ref: templateRef }).limit(1).execute()
          .then(data => {
            this.document = data[0].structure
          })
          .catch(error => {
            console.log(error)

            router.replace('/404')
          })
      }
    },

    data () {
      return {
        document: [],
        documentCreated: '',
        documentLastSaved: '',
        documentTitle: '',
        draggableOptions: {
          handle: '.fa-sort',
          ghostClass: 'draggable-ghost'
        },
        message: {}
      }
    },

    methods: {

      formatDate (rawDate) {
        var date = new Date(rawDate)
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        var year = date.getFullYear()
        var month = months[date.getMonth()]
        var day = date.getDate()
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

        return month + ' ' + day + ', ' + year + ' at ' + hour + ':' + minute + ' ' + amPm
      },

      saveButtonCue (action) {
        var saveButtons = document.getElementsByClassName('save-button')
        for (var i = 0; i < saveButtons.length; i++) {
          if (action === 'saving') {
            saveButtons[i].addClass('is-loading')
          } else {
            saveButtons[i].removeClass('is-loading')
          }
        }
      },

      save () {
        var router = this.$router

        var documentId = router.currentRoute.params.documentId
        var templateRef = router.currentRoute.params.templateRef

        this.saveButtonCue('saving')

        if (documentId) {
          // EDIT DOCUMENT, do a normal save
          collDocuments
            .updateOne({
              _id: new ObjectID(documentId),
              owner_id: stitchClient.authedId()
            },
            {
              $set: {
                content: this.document,
                lastSaved: new Date(),
                title: this.documentTitle || 'Untitled'
              }
            })
            .then(data => {
              this.documentLastSaved = new Date()
              this.timedNotification({
                text: 'Your document has been saved.',
                type: 'is-success'
              })

              this.saveButtonCue('done')
            })
            .catch(error => {
              console.log(error)

              this.timedNotification({
                text: 'An error has occurred, your document could not be saved at this time.',
                type: 'is-danger'
              })

              this.saveButtonCue('done')
            })
        } else if (templateRef) {
          // NEW DOCUMENT, do an insert and redirect the user to edit
          collDocuments
            .insertOne({
              active: 1,
              content: this.document,
              created: new Date(),
              owner_id: stitchClient.authedId(),
              title: this.documentTitle || 'Untitled'
            })
            .then(data => {
              console.log(data)
              this.timedNotification({
                text: 'Document saved.',
                type: 'is-success'
              })
              this.saveButtonCue('done')
              this.$router.replace('/app/editor/' + data.insertedId.toHexString())
            })
            .catch(error => {
              console.log(error)

              this.timedNotification({
                text: 'An error has occurred, your document could not be saved. Please try again later.',
                type: 'is-danger'
              })

              this.saveButtonCue('done')
            })
        }
      },

      previewSentence (sentence) {
        if (sentence) {
          if (!sentence.endsWith('.') && !sentence.endsWith('!') && !sentence.endsWith('?') && !sentence.endsWith('"')) {
            sentence += '.'
          }
          sentence += ' '
        }

        return sentence
      },

      timedNotification (message) {
        this.message = message

        setTimeout(() => {
          this.message = {}
        }, 1111)
      },

      toggleCollapse (index) {
        let collapsible = document.getElementById('collapsible_' + index)

        if (collapsible.style.display === 'none') {
          collapsible.style.display = 'block'
        } else {
          collapsible.style.display = 'none'
        }
      },

      toggleCollapseAll (action) {
        let collapsibles = document.getElementsByClassName('collapsible')

        let setDisplay = 'block'
        if (action === 'collapse') {
          setDisplay = 'none'
        }

        for (let i in collapsibles) {
          collapsibles.item(i).style.display = setDisplay
        }

        return false
      },

      addSentence (paragraph) {
        paragraph.sentences.push({
          content: '',
          placeholder: 'Added sentence'
        })
      },

      deleteSentence (pIndex, sIndex) {
        if (confirm("Are you sure you'd like to delete this sentence?")) {
          this.document[pIndex].sentences.splice(sIndex, 1)
        }
      },

      addParagraph () {
        this.document.push({
          sentences: [],
          title: 'Added Paragraph'
        })
      },

      deleteParagraph (index) {
        if (confirm("Are you sure you'd like to delete this whole paragraph?")) {
          this.document.splice(index, 1)
        }
      }
    }
  }
</script>

<style scoped>
  .dropdown-menu {
    left: auto;
    right: 0 !important;
  }

  .textarea {
    min-height: 5em !important;
    line-height: 1.3;
    padding: 0.5em;
  }

  .fa-sort:hover {
    cursor: grab;
  }

  .field {

  }
  .notification {
    padding: 1rem;
  }
  p.is-clearfix {
    padding-bottom: 0.75rem;
  }
  .media, .media .media {
    border-top: none;
    padding-top: 0;
  }

  .draggable-ghost {
    opacity: 0.25;
    background: #fae0e2;
  }
</style>
