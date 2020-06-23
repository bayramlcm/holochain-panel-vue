import Vue from 'vue'
import Vuex from 'vuex'

import notification from './modules/notification'
import holochain from './modules/holochain'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    holochain,
    notification,
    users,
  },
})
