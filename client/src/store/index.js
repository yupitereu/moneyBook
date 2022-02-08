import Vue from 'vue'
import Vuex from 'vuex'
import headerUI from "@/store/headerUI";
import member from "@/store/member";
import moment from "moment/moment";
import 'moment/locale/ko'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clickTarget: null,
    accountingMonth: moment().format('yyyy-MM'),
    categorySelectionKey: {main: 'outgoing', sub: '0'},
    allCategory: {
      main: [{key: 'outgoing', categoryName: '예산 및 지출'}, {key: 'income', categoryName: '수입'}],
      sub: {
        income: [{key: '0', categoryName: '전체'}],
        outgoing: [{key: '0', categoryName: '전체'}]
      }
    }
  },
  getters: {
    CLICK_TARGET: state => state.clickTarget,
    CATEGORY_SELECTION_KEY: state => state.categorySelectionKey,
    ALL_CATEGORY: state => state.allCategory
  },
  mutations: {
    SET_CLICK_TARGET: (state, payload) => {
      state.clickTarget = payload
    },
    SET_YEAR_MONTH: (state, payload) => {
      state.accountingMonth = payload;
    },
    SET_CATEGORY_SELECTION: (state, payload) => state.categorySelectionKey = payload,
    SET_All_CATEGORY: (state, payload) => state.allCategory = payload
  },
  actions: {
  },
  modules: {
    headerUI,
    member
  }
})
