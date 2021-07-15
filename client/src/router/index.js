import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'defaultLayout',
    component: () => import(/* webpackChunkName: "defaultLayout" */ '@/common/defaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originRouterPushFunction = VueRouter.prototype.push;
VueRouter.prototype.push = async function (location) {
  try {
    return await originRouterPushFunction.call(this, location);
  } catch (error) {
    if (error.name !== 'NavigationDuplicated') throw error;
  }
};

export default router
