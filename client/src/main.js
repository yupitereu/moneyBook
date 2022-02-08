import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/common/App.vue'
import axios from 'axios'
import moment from 'moment/moment'
import cookie from '@/common/script/cookie'
import 'moment/locale/ko'
import '@/common/script/prototypes'

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$cookie = cookie;
Vue.prototype.$axios = axios;
Kakao.init('27341437aa1a4aa4a8c0a8dea1c71e41');

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
