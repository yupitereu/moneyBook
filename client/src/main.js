import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import App from '@/common/App.vue'
import router from '@/router'
import store from '@/store'
import '@/common/script/prototypes'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
