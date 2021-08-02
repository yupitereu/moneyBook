import Vue from 'vue'
import Vuex from 'vuex'
import headerUI from "@/store/headerUI";
import member from "@/store/member";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    headerUI,
    member
  }
})
