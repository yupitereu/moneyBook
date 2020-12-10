import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.axios = axios
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
