import Vue from 'vue'
import Vuex from 'vuex'
import headerUI from "@/store/headerUI";
import member from "@/store/member";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clickTarget: null
  },
  getters: {
    CLICK_TARGET: (state) => state.clickTarget
  },
  mutations: {
    SET_CLICK_TARGET: (state, payload) => {
      state.clickTarget = payload
    }
  },
  actions: {
  },
  modules: {
    headerUI,
    member
  }
})
