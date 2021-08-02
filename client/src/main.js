import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/common/App.vue'
import axios from 'axios'
import moment from 'moment/moment'
import cookie from '@/common/script/cookie'
import 'moment/locale/ko'
import '@/common/script/prototypes'

const CancelToken = axios.CancelToken;
let source = CancelToken.source();
axios.defaults.baseURL = '/api';
axios.interceptors.request.use(config => {
      config.cancelToken = source.token;
      config.headers.Authorization = cookie.get('accessToken') && `Bearer ${cookie.get('accessToken')}` || "";
      config.headers['refresh-token'] = (cookie.get('refreshToken') && `${cookie.get('refreshToken')}`) || (localStorage.getItem('refreshToken') && `${localStorage.getItem('refreshToken')}`) || "";
      return config;
    },
    error => {
      return Promise.reject(error.response);
    }
);

axios.interceptors.response.use(response => {
      if (response.headers.authorization) {
        const accessToken = response.headers.authorization.replace('Bearer ', '');
        if (accessToken) {
          cookie.set('accessToken', accessToken);
        }
      } else {
        cookie.set('accessToken');
        cookie.set('refreshToken');
        localStorage.removeItem('refreshToken');
      }

      return response;
    },
    error => {
      if (error.response && error.response.status === 401 && error.response.statusText === 'Not member') {
        source.cancel('User cancel request'); // 진행중인 다른 HTTP 요청 모두 취소
        source = CancelToken.source();
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

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$cookie = cookie;
Vue.prototype.$axios = axios;
Kakao.init('27341437aa1a4aa4a8c0a8dea1c71e41');

const rootVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
