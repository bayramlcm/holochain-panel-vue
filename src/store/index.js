import Vue from 'vue'
import Vuex from 'vuex'

import Holochain from './modules/holochain'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    holochain: Holochain,
  }
})
