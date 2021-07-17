import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "DefaultLayout" */ '@/components/layout/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Main/Home.vue')
      }
    ]
  },
  {
    path: '/member/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Member/Login.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '@/views/Main/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const originRouterPushFunction = VueRouter.prototype.push;
VueRouter.prototype.push = async function (location) {
  try {
    return await originRouterPushFunction.call(this, location);
  } catch (error) {
    if (error.name !== 'NavigationDuplicated') throw error;
  }
};

router.beforeEach((to, from, next) => {
  next();
});

export default router
