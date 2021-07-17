import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/common/App.vue'
import axios from 'axios'
import moment from 'moment/moment'
import cookie from '@/common/script/cookie'
import 'moment/locale/ko'
import '@/common/script/prototypes'

moment.locale('ko');
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$cookie = cookie;
Vue.prototype.$axios = axios;

const rootVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

axios.interceptors.request.use(config => {
      config.cancelToken= source.token;
      config.headers.Authorization = (cookie.get('accessToken') && `Bearer ${cookie.get('accessToken')}`) || (localStorage.getItem('accessToken') && `Bearer ${localStorage.getItem('accessToken')}`) || "";
      config.headers['refresh-token'] = (cookie.get('refreshToken') && `${cookie.get('refreshToken')}`) || (localStorage.getItem('refreshToken') && `${localStorage.getItem('refreshToken')}`) || "";
      return config;
    },
    error => {
      return Promise.reject(error.response);
    }
);

axios.interceptors.response.use(response => {
      let localStorageToken = localStorage.getItem('accessToken');
      if (localStorageToken) {
        const accessToken = cookie.get('accessToken');
        if (accessToken && accessToken !== localStorageToken) {
          localStorage.setItem('accessToken', accessToken);
          cookie.set('accessToken');
        }
      }

      return response;
    },
    error => {
      if (error.response && error.response.status === 401 && error.response.statusText === 'Not member') {
        source.cancel('User cancel request'); // 진행중인 다른 HTTP 요청 모두 취소

        rootVue.$emit('showDialogue', {message: '로그인하지 않은 유저입니다.'}, () => {
          router.push('/member/login');
        });
        return Promise.reject(error.response);
      }
      else {
        return Promise.reject(error.response);
      }
    }
);
