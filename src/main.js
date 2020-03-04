// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueStripeCheckout from 'vue-stripe-checkout'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import stitchClient from '@/mongoDBServices'

Vue.use(Vuex)

Vue.use(VueStripeCheckout, {
  // allowRememberMe: false,
  currency: 'usd',
  image: require('@/assets/img/logos/logo.png'),
  key: window.location.hostname === 'localhost' ? 'TEST_PUBLIC_KEY' : 'LIVE_PUBLIC_KEY',
  name: 'WriteFlow',
  locale: 'auto',
  zipCode: true
})

var store = new Vuex.Store({
  state: {
    allowAuth: true,
    stitchClient: stitchClient,
    userName: ''
  },
  strict: true,
  mutations: {
    setUserName (state, name) {
      state.userName = name
    }
  }
})

if (stitchClient.authedId()) {
  stitchClient.userProfile()
    .then(user => {
      store.commit('setUserName', user.data.email)
    })
    .catch(error => {
      console.log(JSON.stringify(error))

      store.commit('setUserName', 'My Account')
    })
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  el: '#app',
  router,
  store,
  template: '<App/>'
})
